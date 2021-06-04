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

    public get uvs() {
        return [
            0, 0.5,
            0.5, 0.5,
            0, 0,
            0.5, 0,
            0, 1, 1, 1, 0, 0, 1, 0,];
    }
}