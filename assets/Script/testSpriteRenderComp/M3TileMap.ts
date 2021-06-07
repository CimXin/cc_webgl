import M3TileMapAssembler2D from "./M3TileMapAssembler2D";


const { ccclass, property } = cc._decorator;
@ccclass
export class M3TileMap extends cc.Sprite {
    /** 显示sprites的uv点的数据 */
    private _spriteUvs = [];
    /** 显示sprites的坐标点的数据 */
    private _spritePoses = [];
    /** 显示sprite的个数 */
    private _spriteCount = 0;

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new M3TileMapAssembler2D();
        this._assembler.init(this);
    }

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
    }

    start() {
        /** for test */
        this.drawArea(cc.rect(30, 10, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        this.drawArea(cc.rect(0, 0, 60, 60), cc.rect(0, 0.5, 0, 0.5));
        this.drawArea(cc.rect(60, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        // this.drawArea(cc.rect(120, 60, 60, 60), cc.rect(0, 0.2, 0.5, 1));
        // this.drawArea(cc.rect(120, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 3)
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

    /** 必须包含坐标点 uv的坐标 */
    public drawArea(posRect: cc.Rect, uvArea: cc.Rect) {
        this._spriteCount++;

        //需要把图片的坐标点 和uv的信息存储起来
        this._spritePoses.push(posRect.x, posRect.y);
        this.addUvs(uvArea);
        this.setVertsDirty();
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