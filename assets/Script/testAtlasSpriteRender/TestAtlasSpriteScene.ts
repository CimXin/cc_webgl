import { M3AtlasTileMap } from "./M3AtlasTileMap";



const { ccclass, property } = cc._decorator;
@ccclass

export default class TestAtlasSpriteScene extends cc.Component {

    @property(M3AtlasTileMap)
    tileMap: M3AtlasTileMap = null;

    @property(cc.SpriteAtlas)
    testAtlas: cc.SpriteAtlas = null;


    start() {
        console.error(this.tileMap);

        console.error(this.testAtlas);
    }

}