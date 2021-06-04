const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        cc.dynamicAtlasManager.enabled = false;
        // init logic
        this.label.string = this.text;
    }
}
