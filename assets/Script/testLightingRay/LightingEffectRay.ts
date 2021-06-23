// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { MathUtils } from "../Common/MathUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LightingEffectRay extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;


    start() {


    }

    private _delta = 1;
    private _time = 0;
    private _offset = Math.random();
    update(dt) {

        let material = this.sprite.getMaterial(0);

        let cutTime = MathUtils.clamp((1.0 / (1.0 - 0.5)) * (this._time - 0.5), 0.0, 1.0);

        material.setProperty("u_time", this._time);
        material.setProperty("u_distance", 0.16);// 0.2);
        material.setProperty("u_cutTime", cutTime);

        material.setProperty("u_offset", this._offset);

        // console.error("ssss");
        // this.node.setPosition();

        // let radianAngle = MathUtils.GetAngle(cc.v2(0, 0), cc.v2(0, 60));
        // let r = 192;
        // let dx = r * Math.sin(radianAngle - 0.5 * Math.PI);
        // let dy = r * Math.cos(radianAngle - 0.5 * Math.PI);
        // let angle = 90 - 180 * radianAngle * (1 / Math.PI);

        // // this.node.setRotation(angle);

        // this.node.setPosition(cc.v2(0, 0));

        // let m = this.node._worldMatrix.m;

        // let offsetX = -dx;
        // let offsetY = -dy;
        // let offsetZ = 0;
        // m[12] += offsetX * m[0] + offsetY * m[4] + offsetZ * m[8];
        // m[13] += offsetX * m[1] + offsetY * m[5] + offsetZ * m[9];
        // m[14] += offsetX * m[2] + offsetY * m[6] + offsetZ * m[10];
        // m[15] += offsetX * m[3] + offsetY * m[7] + offsetZ * m[11];

        // this.sprite._vertsDirty = true;

        if (this._time < 1) {
            this._time += dt;
        }
        this._delta -= dt * 2;
    }

}
