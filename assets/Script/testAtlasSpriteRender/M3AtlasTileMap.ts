import M3AtlasTileMapAssembler2D from "./M3TileMapAssembler2D";

const { ccclass, property } = cc._decorator;
@ccclass
export class M3AtlasTileMap extends cc.Sprite {
    /** 显示sprites的uv点的数据 */
    private _spriteUvs = [];
    /** 显示sprites的坐标点的数据 */
    private _spritePoses = [];
    /** 显示sprite的个数 */
    private _spriteCount = 0;
    /** 单个sprite的宽高 */
    private _locals = [];

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new M3AtlasTileMapAssembler2D();
        this._assembler.init(this);
    }

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
    }

    start() {
        /** for test */
        // this.drawArea(cc.rect(30, 10, 60, 60), cc.rect(0, 1, 0, 1));
        // this.drawArea(cc.rect(0, 0, 60, 60), cc.rect(0, 0.5, 0, 0.5));
        // this.drawArea(cc.rect(60, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        // this.drawArea(cc.rect(120, 60, 60, 60), cc.rect(0, 0.2, 0.5, 1));
        // this.drawArea(cc.rect(120, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        // this.scheduleOnce(() => {
        //     this.node.destroy();
        // }, 3)
        /** for test */
    }

    public get uvs() {
        return this._spriteUvs;
    }

    public get spritePoses() {
        return this._spritePoses;
    }

    public get spriteCount() {
        return this._spriteCount;
    }

    public get locals() {
        return this._locals;
    }

    /** 必须包含坐标点 uv的坐标 */
    public drawArea(rect: cc.Rect, area: cc.Rect, offset: cc.Vec2 = cc.v2()) {
        this._spriteCount++;

        //需要把图片的坐标点 和uv的信息存储起来
        this._spritePoses.push(rect.x + offset.x, rect.y + offset.y);
        this.addLocals(rect, area);
        this.addUvs(area);
        this.setVertsDirty();
    }

    private addLocals(rect: cc.Rect, uvArea: cc.Rect) {
        let sw = rect.width * (uvArea.y - uvArea.x);
        let sh = rect.height * ((1 - uvArea.width) - (1 - uvArea.height));
        let appx = this.node.anchorX * sw;
        let appy = this.node.anchorY * sh;
        let l, b, r, t;
        if (this.trim) {
            l = -appx;
            b = -appy;
            r = sw - appx;
            t = sh - appy;
        } else {
            console.log("need todo");
        }
        this._locals.push(l, b, r, t);
    }

    private addUvs(uvArea: cc.Rect) {
        let x0 = uvArea.x;
        let x1 = uvArea.y;
        let y0 = uvArea.width;
        let y1 = uvArea.height;
        this._spriteUvs.push(
            x0, y1,
            x1, y1,
            x0, y0,
            x1, y0
        );
    }

    onDestroy() {
        this._spriteUvs = null;
        this._spritePoses = null;
        this._spriteCount = 0;
    }
}