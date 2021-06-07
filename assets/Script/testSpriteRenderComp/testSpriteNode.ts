
const { ccclass, property } = cc._decorator;
@ccclass
export class TestSpriteNode extends cc.Component {

    @property(cc.SpriteFrame)
    spr: cc.SpriteFrame = null;
    start() {

        // this.scheduleOnce(()=>{});
        // for (let i = 0; i < 1000000; i++) {
        //     this.addNode();
        // }
    }

    public addNode() {
        let node = new cc.Node();
        let sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.spr;
        this.node.addChild(node);
    }
}