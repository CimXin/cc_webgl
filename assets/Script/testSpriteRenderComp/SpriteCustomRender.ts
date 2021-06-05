import GDSimpleSpriteAssembler2D from "./GDSimpleSpriteAssembler2D";


const { ccclass, property } = cc._decorator;
@ccclass
export class SpriteCustomRender extends cc.Sprite {

    public get spriteCount() {
        return this._spriteCount;
    }
    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new GDSimpleSpriteAssembler2D();
        this._assembler.init(this);
    }

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;



    }

    start(){
        // super.onEnable();
        this.drawArea(cc.rect(0, 0, 60, 60), cc.rect(0, 0.5, 0, 0.5));
        this.drawArea(cc.rect(60, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        this.drawArea(cc.rect(60, 60, 60, 60), cc.rect(0, 0.5, 0.5, 1));
        this.drawArea(cc.rect(120, 60, 60, 60), cc.rect(0, 0.2, 0.5, 1));
        this.drawArea(cc.rect(120, 0, 60, 60), cc.rect(0, 0.5, 0.5, 1));

    }

    public get uvs() {
        // return [       //      c__d 
        //     0, 0.5,    //a     |  |
        //     0.5, 0.5,  //b     a__b 
        //     0, 0,      //c
        //     0.5, 0,    //d
        //     0.5, 1,
        //     1, 1,
        //     0.5, 0.5,
        //     1, 0.5];
        return this._spriteUvs;
    }

    public get spritePoses() {
        return this._spritePoses;
    }

    private _spriteUvs = [];
    private _spritePoses = [];
    private _spriteCount = 0;

    /** 必须包含坐标点 uv的坐标 */
    public drawArea(posRect: cc.Rect, uvArea: cc.Rect) {
        this._spriteCount++;

        //需要把图片的坐标点 和uv的信息存储起来
        this._spritePoses.push(posRect.x, posRect.y);
        this.addUvs(uvArea);
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
}