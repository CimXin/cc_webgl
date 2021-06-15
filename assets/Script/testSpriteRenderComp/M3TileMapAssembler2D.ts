
import M3Assembler2D from "./M3Assembler2D";
import { M3TileMap } from "./M3TileMap";

export default class M3TileMapAssembler2D extends M3Assembler2D {
    // 这部分使用SimpleSpriteAssembler的内容
    updateRenderData(sprite: M3TileMap) {
        this.packToDynamicAtlas(sprite, sprite._spriteFrame);
        super.updateRenderData(sprite);
    }

    updateUVs(sprite: M3TileMap) {
        let uv = sprite.uvs;//sprite._spriteFrame.uv;
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];
        for (let i = 0; i < 4 * sprite.spriteCount; i++) {
            let srcOffset = i * 2;
            let dstOffset = floatsPerVert * i + uvOffset;
            verts[dstOffset] = uv[srcOffset];
            verts[dstOffset + 1] = uv[srcOffset + 1];
        }
    }

    updateVerts(sprite) {
        // let node = sprite.node,
        //     cw = 60,//node.width / 2,
        //     ch = 60,//node.height / 2,
        //     appx = node.anchorX * cw, appy = node.anchorY * ch,
        //     l, b, r, t;
        // if (sprite.trim) {
        //     l = -appx;
        //     b = -appy;
        //     r = cw - appx;
        //     t = ch - appy;
        // }
        // else {
        //     let frame = sprite.spriteFrame,
        //         ow = frame._originalSize.width, oh = frame._originalSize.height,
        //         rw = frame._rect.width, rh = frame._rect.height,
        //         offset = frame._offset,
        //         scaleX = cw / ow, scaleY = ch / oh;
        //     let trimLeft = offset.x + (ow - rw) / 2;
        //     let trimRight = offset.x - (ow - rw) / 2;
        //     let trimBottom = offset.y + (oh - rh) / 2;
        //     let trimTop = offset.y - (oh - rh) / 2;
        //     l = trimLeft * scaleX - appx;
        //     b = trimBottom * scaleY - appy;
        //     r = cw + trimRight * scaleX - appx;
        //     t = ch + trimTop * scaleY - appy;
        // }

        // let local = this._local;
        // local[0] = l;
        // local[1] = b;
        // local[2] = r;
        // local[3] = t;

        // for (let i = 0; i < sprite.spriteCount; i++) {
        //     this.updateWorldVerts(sprite, i);
        // }
        this._local = sprite.locals;
        for (let i = 0; i < sprite.spriteCount; i++) {
            this.updateWorldVerts(sprite, i);
        }
    }
}
