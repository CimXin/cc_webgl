import GDSimpleSpriteAssembler2D from "./GDSimpleSpriteAssembler2D";


const { ccclass, property } = cc._decorator;
@ccclass
export class SpriteCustomRender extends cc.Sprite {

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new GDSimpleSpriteAssembler2D();
        this._assembler.init(this);
    }

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
    }
}