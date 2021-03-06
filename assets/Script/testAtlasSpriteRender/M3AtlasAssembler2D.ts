

// 自定义渲染

import { M3AtlasTileMap } from "./M3AtlasTileMap";

// https://docs.cocos.com/creator/manual/zh/advanced-topics/custom-render.html#%E8%87%AA%E5%AE%9A%E4%B9%89-assembler
export default class M3AtlasAssembler2D extends cc.Assembler {
    // 每个2d渲染单元里的有:
    // 4个顶点属性数据
    // 6个顶点索引 -> 三角剖分成2个三角形

    // 每个顶点属性由5个32位数据组成
    // 顶点属性声明:
    // var vfmtPosUvColor = new gfx.VertexFormat([
    //     { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    //     { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    //     { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },       // 4个uint8
    // ]);
    // 顶点属性数据排列，每一格是32位 (float32/uint32)
    // x|y|u|v|color|x|y|u|v|color|...
    // 其中uv在一组数据中的偏移是2，color的偏移是4
    verticesCount = 4;
    indicesCount = 6;
    floatsPerVert = 5;

    // vdata offset info
    uvOffset = 2;
    colorOffset = 4;

    protected _renderData: cc.RenderData = null;
    protected _local: any = null;          // 中间结果。[l,b,r,t]。node对象左下、右上顶点的本地坐标，即相对于锚点的偏移

    init(comp: cc.RenderComponent) {
        super.init(comp);

        // cc.Assembler2D的初始化放在constructor里
        // 此处把初始化放在init里，以便成员变量能够有机会修改
        this._renderData = new cc.RenderData();
        this._renderData.init(this);

        this.initLocal();
        this.initData();
    }

    get verticesFloats() {
        return this.verticesCount * this.floatsPerVert * 100;
    }

    initData() {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indicesCount * 100);
        // createQuadData内部会调用initQuadIndices初始化索引信息
        // 如果是用用flexbuffer创建则需要自己初始化
    }

    initLocal() {
        this._local = [];
        this._local.length = 4;
    }

    updateColors(comp) {
        // for (let i = 0; i < comp.spriteCount; i++) {
        //     this.updateColor(comp, i);
        // }
        this.updateColor(comp);
    }

    updateColor(comp) {
        // render data = verts = x|y|u|v|color|x|y|u|v|color|...
        // 填充render data中4个顶点的color部分
        let uintVerts = this._renderData.uintVDatas[0];
        if (!uintVerts) return;
        // color = color != null ? color : comp.node.color._val;
        let colors = comp.colors as any[];

        let floatsPerVert = this.floatsPerVert;
        let colorOffset = this.colorOffset;
        let index = 0;
        for (let i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
            if (index + 1 <= colors.length) {
                uintVerts[i] = colors[index];
                index++;
            } else {
                uintVerts[i] = comp.node.color._val;
            }
        }
    }

    getBuffer() {
        //@ts-ignore
        return cc.renderer._handle._meshBuffer;
    }

    updateWorldVerts(comp, index) {
        this.updateWorldVertsWebGL(comp, index);
    }


    // 将准备好的顶点数据填充进 VertexBuffer 和 IndiceBuffer
    fillBuffers(comp: M3AtlasTileMap, renderer) {
        if (renderer.worldMatDirty) {
            for (let i = 0; i < comp.spriteCount; i++) {
                this.updateWorldVerts(comp, i);
            }
        }

        let renderData = this._renderData;
        let vData = renderData.vDatas[0];
        let iData = renderData.iDatas[0];

        this.verticesCount = 4 * comp.spriteCount;

        let buffer = this.getBuffer(/*renderer*/);
        let offsetInfo = buffer.request(this.verticesCount, this.indicesCount * comp.spriteCount);

        // buffer data may be realloc, need get reference after request.

        // fill vertices
        let vertexOffset = offsetInfo.byteOffset >> 2,
            vbuf = buffer._vData;

        if (vData.length + vertexOffset > vbuf.length) {
            vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
        } else {
            vbuf.set(vData, vertexOffset);
        }

        // fill indices
        let ibuf = buffer._iData,
            indiceOffset = offsetInfo.indiceOffset,
            vertexId = offsetInfo.vertexOffset;             // vertexId是已经在buffer里的顶点数，也是当前顶点序号的基数
        for (let i = 0, l = iData.length; i < l; i++) {
            ibuf[indiceOffset++] = vertexId + iData[i];
        }
    }

    packToDynamicAtlas(comp, frame) {
        if (CC_TEST) return;

        if (!frame._original && cc.dynamicAtlasManager && frame._texture.packable) {
            let packedFrame = cc.dynamicAtlasManager.insertSpriteFrame(frame);
            //@ts-ignore
            if (packedFrame) {
                frame._setDynamicAtlasFrame(packedFrame);
            }
        }
        let material = comp._materials[0];
        if (!material) return;

        if (material.getProperty('texture') !== frame._texture) {
            // texture was packed to dynamic atlas, should update uvs
            comp._vertsDirty = true;
            comp._updateMaterial();
        }
    }

    protected updateUVs(comp: cc.RenderComponent) {
        // 4个顶点的uv坐标，对应左下、右下、左上、右上
        // 如果是cc.Sprite组件，这里取sprite._spriteFrame.uv;
        let uv = [0, 0, 1, 0, 0, 1, 1, 1];
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];

        // render data = verts = x|y|u|v|color|x|y|u|v|color|...
        // 填充render data中4个顶点的uv部分
        for (let i = 0; i < 4; i++) {
            let srcOffset = i * 2;
            let dstOffset = floatsPerVert * i + uvOffset;
            verts[dstOffset] = uv[srcOffset];
            verts[dstOffset + 1] = uv[srcOffset + 1];
        }
    }

    protected updateVerts(comp: M3AtlasTileMap) {
        // let node: cc.Node = comp.node,
        //     cw: number = node.width,
        //     ch: number = node.height,
        //     appx: number = node.anchorX * cw,
        //     appy: number = node.anchorY * ch,
        //     l: number,
        //     b: number,
        //     r: number,
        //     t: number;

        // l = - appx;
        // b = - appy;
        // r = cw - appx;
        // t = ch - appy;

        // let local = this._local;
        // local[0] = l;
        // local[1] = b;
        // local[2] = r;
        // local[3] = t;
        // for (let i = 0; i < comp.spriteCount; i++) {
        //     this.updateWorldVerts(comp, i);
        // }

        // this._local = comp.locals;
        for (let i = 0; i < comp.spriteCount; i++) {
            this.updateWorldVerts(comp, i);
        }
    }

    public updateRenderData(comp: M3AtlasTileMap) {
        if (comp._vertsDirty) {
            this.updateUVs(comp);
            this.updateVerts(comp);
            this.updateColors(comp);
            comp._vertsDirty = false;
        }
    }

    /** 更新图片的世界坐标点 */
    updateWorldVertsWebGL(comp: M3AtlasTileMap, index) {
        // let local = this._local;
        let verts = this._renderData.vDatas[0];

        let matrix = comp.node._worldMatrix;
        let matrixm = matrix.m,
            a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5],
            tx = matrixm[12], ty = matrixm[13];

        let curCount = index;

        // let vl = local[0 + index * 4], vr = local[2 + index * 4],
        //     vb = local[1 + index * 4], vt = local[3 + index * 4];

        /*
        m00 = 1, m01 = 0, m02 = 0, m03 = 0,
        m04 = 0, m05 = 1, m06 = 0, m07 = 0,
        m08 = 0, m09 = 0, m10 = 1, m11 = 0,
        m12 = 0, m13 = 0, m14 = 0, m15 = 1
        */
        // [a,b,c,d] = _worldMatrix[1,2,4,5] == [1,0,0,1]
        // _worldMatrix[12,13]是xy的平移量
        // 即世界矩阵的左上角2x2是单元矩阵，说明在2D场景内没有出现旋转或者缩放
        let justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

        // render data = verts = x|y|u|v|color|x|y|u|v|color|...
        // 填充render data中4个顶点的xy部分
        // let index = 0;
        // let curCount = index;
        index = index * 5 * 4;
        let floatsPerVert = this.floatsPerVert;

        //存储的sprite的局部坐标点

        // let spritePoses = comp.spritePoses;

        // let jx = spritePoses[curCount * 2 + 0];
        // let jy = spritePoses[curCount * 2 + 1];

        let vertexs = comp.vertexs;

        verts[index] = vertexs[0 + curCount * 8] + tx;//vl + tx + jx;
        verts[index + 1] = vertexs[1 + curCount * 8] + ty;//vb + ty + jy;
        index += floatsPerVert;
        // right bottom
        verts[index] = vertexs[2 + curCount * 8] + tx;//vr + tx + jx;
        verts[index + 1] = vertexs[3 + curCount * 8] + ty;//vb + ty + jy;
        index += floatsPerVert;
        // left top
        verts[index] = vertexs[4 + curCount * 8] + tx;//vl + tx + jx;
        verts[index + 1] = vertexs[5 + curCount * 8] + ty;// vt + ty + jy;
        index += floatsPerVert;
        // right top
        verts[index] = vertexs[6 + curCount * 8] + tx;//vr + tx + jx;
        verts[index + 1] = vertexs[7 + curCount * 8] + ty;//vt + ty + jy;

        return;
        // if (justTranslate) {
        //     // left bottom
        //     verts[index] = vl + tx + jx;
        //     verts[index + 1] = vb + ty + jy;
        //     index += floatsPerVert;
        //     // right bottom
        //     verts[index] = vr + tx + jx;
        //     verts[index + 1] = vb + ty + jy;
        //     index += floatsPerVert;
        //     // left top
        //     verts[index] = vl + tx + jx;
        //     verts[index + 1] = vt + ty + jy;
        //     index += floatsPerVert;
        //     // right top
        //     verts[index] = vr + tx + jx;
        //     verts[index + 1] = vt + ty + jy;
        // } else {
        //     // 4对xy分别乘以 [2,2]仿射矩阵，然后+平移量
        //     let al = a * vl, ar = a * vr,
        //         bl = b * vl, br = b * vr,
        //         cb = c * vb, ct = c * vt,
        //         db = d * vb, dt = d * vt;

        //     // left bottom
        //     // newx = vl * a + vb * c + tx
        //     // newy = vl * b + vb * d + ty
        //     verts[index] = al + cb + tx + jx * a;
        //     verts[index + 1] = bl + db + ty + jy * d;
        //     index += floatsPerVert;
        //     // right bottom
        //     verts[index] = ar + cb + tx + jx * a;
        //     verts[index + 1] = br + db + ty + jy * d;
        //     index += floatsPerVert;
        //     // left top
        //     verts[index] = al + ct + tx + jx * a;
        //     verts[index + 1] = bl + dt + ty + jy * d;
        //     index += floatsPerVert;
        //     // right top
        //     verts[index] = ar + ct + tx + jx * a;
        //     verts[index + 1] = br + dt + ty + jy * d;
        // }
    }

}
