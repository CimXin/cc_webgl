import { Common, MathUtils } from "../Common/MathUtils";
import M3AtlasTileMapAssembler2D from "./M3AtlasTileMapAssembler2D";

const { ccclass, property } = cc._decorator;
@ccclass
export class M3AtlasTileMap extends cc.Sprite {
    /** 显示sprites的uv点的数据 */
    private _spriteUvs = [];
    /** 显示sprites的坐标点的数据 */
    // private _spritePoses = [];
    /** 显示sprite的个数 */
    private _spriteCount = 0;
    /** 单个sprite的宽高 */
    // private _locals = [];
    /** 单个sprite的顶点颜色值 */
    private _colors = [];
    /** 单个sprite的局部坐标值（已计算好缩放值） */
    private _vertexs = [];

    private _scaleX: number = 1;
    private _scaleY: number = 1;
    private _tempRect = new cc.Rect();
    private _tempVec = [];

    @property(cc.SpriteAtlas)
    atlasTexure: cc.SpriteAtlas = null;

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new M3AtlasTileMapAssembler2D();
        this._assembler.init(this);
    }

    update() {
        // @ts-ignore
        let matrixm = this.node._worldMatrix.m;
        this._scaleX = matrixm[0];
        this._scaleY = matrixm[5];
    }

    start() {
        // @ts-ignore
        let matrixm = this.node._worldMatrix.m;
        this._scaleX = matrixm[0];
        this._scaleY = matrixm[5];


        this.loadAtlas();

        this.DrawTexture("Body2", cc.v2(60, 60), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body1", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body3", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body4", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body5", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body6", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body7", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        this.DrawTexture("Body8", cc.v2(0, 0), cc.color(255, 255, 255, 255));

        // this.DrawTexture("EdgeOutBL", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        // this.DrawTexture("EdgeOutBL", cc.v2(60, 0), cc.color(255, 255, 255, 255));

        // this.DrawPart("EdgeInBR", 0, 0, cc.rect(0, 1, 0, 1), cc.color(255, 255, 255, 255));
        // this.DrawPart("EdgeInBR", 0, 60, cc.rect(0, 1, 0, 1), cc.color(255, 255, 255, 255));

        // this.DrawPart("EdgeInTL", 0, 0, cc.rect(0.5, 0.9, 0.02, 0.5), cc.color(255, 255, 255, 255));
        // this.DrawPart("EdgeInTR", 60, 0, cc.rect(0, 0.8, 0.17, 1), cc.color(255, 255, 255, 255));

        // this.DrawPart("EdgeInBL", 60, 60, cc.rect(0, 1, 0, 0.5), cc.color(255, 255, 255, 255));

        // this.DrawPart("EdgeInBR", 0, 0, cc.rect(0, 1, 0, 0.6), cc.color(255, 255, 255, 255));

        // this.DrawShape("EdgeOutBL", cc.v2(0, 0), cc.v2(0, 0), cc.v2(1, 1), cc.v2(1, 1), cc.v2(1, 0), cc.color(255, 255, 255));
        // this.DrawShape("EdgeOutBL", cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 1), cc.v2(1, 1), cc.v2(1, 0), cc.color(255, 255, 255));
        // this.DrawShape("EdgeOutTR", cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 1), cc.v2(1, 1), cc.v2(1, 1), cc.color(255, 255, 255));

        // this.DrawShape("EdgeOutBL", cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, -0.22), cc.v2(1.22, 1), cc.v2(1, 1), cc.color(255, 255, 255));

        // this.DrawShape("EdgeOutBL", cc.v2(60, 60), cc.v2(0, 0), cc.v2(1, 1), cc.v2(1, -0.22), cc.v2(-0.22, 0), cc.color(255, 255, 255));
        // this.DrawShape("EdgeOutBL", cc.v2(60, 0), cc.v2(0, 0), cc.v2(1, 1), cc.v2(1, -0.15), cc.v2(-0.15, 0), cc.color(255, 255, 255));

        // this.DrawTexture("Wall_top", cc.v2(60, 0), cc.color());

        this.schedule(() => {
            this.___test();
        }, 1);
    }

    // private _alpha = 0;
    private ___test() {
        this.Clear();
        // this.DrawTexture("Wall_top", cc.v2(60, 0), cc.color(255, 0, 0));
        // this._alpha = Math.min(this._alpha + 1, 255);

        // this.DrawTexture("Wall_bottom", cc.v2(30, 30), cc.color(0, 255, 0, this._alpha), cc.color(255, 0, 0, this._alpha), cc.color(0, 0, 255, this._alpha), cc.color(255, 255, 255, this._alpha));
        // if (this._alpha >= 255) this._alpha = 0;

        // this.DrawShape("EdgeOutBL", cc.v2(0, 0), cc.v2(0, 0), cc.v2(1, 1), cc.v2(1, 1), cc.v2(1, 0), cc.color(255, 255, 255));
        // this.DrawShape("EdgeOutBL", cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 1), cc.v2(1, 1), cc.v2(1, 0), cc.color(255, 255, 255));

        // this.DrawTexture("EdgeOutBL", cc.v2(0, 0), cc.color(255, 255, 255, 255));
        // this.DrawTexture("EdgeOutBL", cc.v2(60, 0), cc.color(255, 255, 255, 255));
        // this.DrawTexture("EdgeOutBL", cc.v2(0, 60), cc.color(255, 255, 255, 255));
        // this.DrawTexture("EdgeOutBL", cc.v2(60, 60), cc.color(255, 255, 255, 255));
    }

    private _atlasTexture: cc.SpriteAtlas = null;

    public get uvs() {
        return this._spriteUvs;
    }

    // public get spritePoses() {
    //     return this._spritePoses;
    // }

    public get spriteCount() {
        return this._spriteCount;
    }

    // public get locals() {
    //     return this._locals;
    // }

    public get colors() {
        return this._colors;
    }
    public get vertexs() {
        return this._vertexs;
    }

    public loadAtlas() {
        this._atlasTexture = this.atlasTexure;
    }

    public DrawTexture(textureName: string, pos: cc.Vec2, color1?, color2?, color3?, color4?) {
        if (!this._atlasTexture) return;

        let spriteFrame = this._atlasTexture.getSpriteFrame(textureName);
        if (!spriteFrame) {
            return;
        }
        this._spriteCount++;

        // this.spritePoses.push(pos.x, pos.y);
        // this.addLocals(spriteFrame);
        this._spriteUvs = this._spriteUvs.concat(spriteFrame.uv);
        this.addColors(color1, color2, color3, color4);

        // let rect = cc.rect(pos.x, pos.y, pos.x + 60 * this._scaleX, pos.y + 60 * this._scaleY);
        this._tempRect.x = pos.x * this._scaleX;
        this._tempRect.y = pos.y * this._scaleY;
        this._tempRect.width = pos.x * this._scaleX + 60 * this._scaleX;
        this._tempRect.height = pos.y * this._scaleY + 60 * this._scaleY;
        let rect = this._tempRect;

        this._tempVec = [
            rect.x, MathUtils.lerp(rect.height, rect.y, 1),
            rect.width, MathUtils.lerp(rect.height, rect.y, 1),
            rect.x, MathUtils.lerp(rect.height, rect.y, 0),
            rect.width, MathUtils.lerp(rect.height, rect.y, 0),
        ];

        this._vertexs = this._vertexs.concat(this._tempVec);
        this.setVertsDirty();
    }

    public DrawPart(textureName: string, posX: number, posY: number, uvArea: cc.Rect, color1?: cc.Color, color2?: cc.Color, color3?: cc.Color, color4?: cc.Color,) {
        if (!this._atlasTexture) return;
        let spriteFrame = this._atlasTexture.getSpriteFrame(textureName);
        if (!spriteFrame) {
            return;
        }
        this._spriteCount++;
        // this._testTextureName.push(textureName);
        // this.spritePoses.push(posX, posY);
        // // this.addLocals(spriteFrame, (uvArea.y - uvArea.x) * Common.CELL_SIZE, (uvArea.height - uvArea.width) * Common.CELL_SIZE);
        // this.addLocals1(uvArea);
        // this.addUvs(uvArea, spriteFrame.uv);
        // this.addColors(color1, color2, color3, color4);
        // this.setVertsDirty();

        let y0 = 1 - uvArea.height;
        let y1 = 1 - uvArea.width;
        uvArea.width = y0;
        uvArea.height = y1;

        posX = posX * this._scaleX;
        posY = posY * this._scaleY;

        this.addUvs(uvArea, spriteFrame.uv);
        this.addColors(color1, color2, color3, color4);
        let rect = cc.rect(
            MathUtils.fma(uvArea.x, Common.CELL_SIZE * this._scaleX, posX),
            // MathUtils.fma(1 - uvArea.height, Common.CELL_SIZE, posY),
            MathUtils.fma(1 - uvArea.height, Common.CELL_SIZE * this._scaleY, posY),
            MathUtils.fma(uvArea.y, Common.CELL_SIZE * this._scaleX, posX),
            MathUtils.fma((uvArea.height - uvArea.width), Common.CELL_SIZE * this._scaleY, posY),
        );
        this._tempVec = [
            // rect.x, MathUtils.lerp(rect.height, rect.y, 1),
            // rect.width, MathUtils.lerp(rect.height, rect.y, 1),
            // rect.x, MathUtils.lerp(rect.width, rect.y, 0),
            // rect.width, MathUtils.lerp(rect.width, rect.y, 0),
            rect.x, rect.y,
            rect.width, rect.y,
            rect.x, rect.height + rect.y - posY,
            rect.width, rect.height + rect.y - posY,
        ];

        this._vertexs = this._vertexs.concat(this._tempVec);
        this.setVertsDirty();
    }



    public DrawShape(textureName: string, pos: cc.Vec2, p1: cc.Vec2, p2: cc.Vec2, p3: cc.Vec2, p4: cc.Vec2, color) {
        if (!this._atlasTexture) return;
        let spriteFrame = this._atlasTexture.getSpriteFrame(textureName);
        if (!spriteFrame) {
            return;
        }
        this._spriteCount++;

        this.addColors(color);

        let uvs = [
            p1.x, 1 - p1.y,   //0,1,
            p4.x, 1 - p4.y,   //1,1,
            p2.x, 1 - p2.y,   //1,0,
            p3.x, 1 - p3.y,   //1,0
        ];

        this.addUvs1(p1, p2, p3, p4, spriteFrame.uv);

        let rect = cc.rect(pos.x - 30, pos.y - 30, pos.x + 30 * this._scaleX, pos.y + 30 * this._scaleY);
        let area = cc.rect(0, 1, 0, 1);
        // let vec = [
        //     // cc.v2(
        //     MathUtils.lerp(rect.x, rect.width, MathUtils.clamp(uvs[0], area.x, area.y)),
        //     MathUtils.lerp(rect.height, rect.y, MathUtils.clamp(uvs[1], area.width, area.height)),
        //     // ),
        //     // cc.v2(
        //     MathUtils.lerp(rect.x, rect.width, MathUtils.clamp(uvs[2], area.x, area.y)),
        //     MathUtils.lerp(rect.height, rect.y, MathUtils.clamp(uvs[3], area.width, area.height)),
        //     // ),
        //     // cc.v2(
        //     MathUtils.lerp(rect.x, rect.width, MathUtils.clamp(uvs[4], area.x, area.y)),
        //     MathUtils.lerp(rect.height, rect.y, MathUtils.clamp(uvs[5], area.width, area.height)),
        //     // ),
        //     // cc.v2(
        //     MathUtils.lerp(rect.x, rect.width, MathUtils.clamp(uvs[6], area.x, area.y)),
        //     MathUtils.lerp(rect.height, rect.y, MathUtils.clamp(uvs[7], area.width, area.height)),
        //     // ),
        // ];

        let vec = [
            30, 30,
            90, 30,
            90, 90,
            30, 30
        ]

        this._vertexs = this._vertexs.concat(vec);
        this.setVertsDirty();

    }

    private addUvs(uvArea: cc.Rect, uvs: number[]) {
        let x0 = uvArea.x * (uvs[2] - uvs[0]) + uvs[0];
        let x1 = uvArea.y * (uvs[2] - uvs[0]) + uvs[0];
        // let y1 = (1 - uvArea.width) * (uvs[1] - uvs[5]) + uvs[5];
        // let y0 = (1 - uvArea.height) * (uvs[1] - uvs[5]) + uvs[5];
        let y0 = (uvArea.height) * (uvs[1] - uvs[5]) + uvs[5];
        let y1 = (uvArea.width) * (uvs[1] - uvs[5]) + uvs[5];
        this._spriteUvs.push(
            // x0, y1,
            // x1, y1,
            // x0, y0,
            // x1, y0
            x0, y0,
            x1, y0,
            x0, y1,
            x1, y1
        );
    }

    private addUvs1(p1: cc.Vec2, p2: cc.Vec2, p3: cc.Vec2, p4: cc.Vec2, uvs: number[]) {
        // private addUvs1(uv: number[], uvs: number[]) {

        // this._spriteUvs.push(
        //     p1.x, 1 - p1.y,   //0,1,
        //     p4.x, 1 - p4.y,   //1,1,
        //     p2.x, 1 - p2.y,   //1,0,
        //     p3.x, 1 - p3.y,   //1,0
        //     // 0, 1,
        //     // 1, 1,
        //     // 1, 0,
        //     // 1, 0

        // );
        // return;
        // uvs = [0, 1, 1, 1, 0, 0, 1, 0];
        this._spriteUvs.push(
            //
            p1.x * (uvs[2] - uvs[0]) + uvs[0], (1 - p1.y) * (uvs[1] - uvs[5]) + uvs[5],
            //
            p4.x * (uvs[2] - uvs[0]) + uvs[0], (1 - p4.y) * (uvs[1] - uvs[5]) + uvs[5],
            //
            p2.x * (uvs[2] - uvs[0]) + uvs[0], (1 - p2.y) * (uvs[1] - uvs[5]) + uvs[5],
            //
            p3.x * (uvs[2] - uvs[0]) + uvs[0], (1 - p3.y) * (uvs[1] - uvs[5]) + uvs[5],
        );
    }

    // private addLocals(spriteFrame: cc.SpriteFrame) {
    //     let sw = spriteFrame._originalSize.width;
    //     let sh = spriteFrame._originalSize.height;
    //     let appx = this.node.anchorX * sw;
    //     let appy = this.node.anchorY * sh;
    //     let l, b, r, t;
    //     if (this.trim) {
    //         l = -appx;
    //         b = -appy;
    //         r = sw - appx;
    //         t = sh - appy;
    //     } else {
    //         let frame = spriteFrame,
    //             ow = frame._originalSize.width, oh = frame._originalSize.height,
    //             rw = frame._rect.width, rh = frame._rect.height,
    //             offset = frame._offset,
    //             scaleX = sw / ow, scaleY = sh / oh;
    //         let trimLeft = offset.x + (ow - rw) / 2;
    //         let trimRight = offset.x - (ow - rw) / 2;
    //         let trimBottom = offset.y + (oh - rh) / 2;
    //         let trimTop = offset.y - (oh - rh) / 2;
    //         l = trimLeft * scaleX - appx;
    //         b = trimBottom * scaleY - appy;
    //         r = sw + trimRight * scaleX - appx;
    //         t = sh + trimTop * scaleY - appy;
    //     }
    //     this._locals.push(l, b, r, t);
    // }

    private addColors(color1?, color2?, color3?, color4?) {
        if (color2 && color3 && color4) {
            this._colors.push(color1._val, color2._val, color3._val, color4._val);
        } else {
            this._colors.push(color1._val, color1._val, color1._val, color1._val);
        }
    }

    onDestroy() {
        this._spriteUvs = null;
        // this._spritePoses = null;
        this._spriteCount = 0;
    }

    public Clear() {
        this._spriteCount = 0;
        this._vertexs = [];
        this._spriteUvs = [];
        // this._spritePoses = [];
        // this._locals = [];
        this._colors = [];
        this._vertexs = [];
        this._tempVec = [];
    }
}