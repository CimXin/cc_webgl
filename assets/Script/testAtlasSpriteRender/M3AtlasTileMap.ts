import M3AtlasTileMapAssembler2D from "./M3AtlasTileMapAssembler2D";

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
    private _colors = [];

    @property(cc.SpriteAtlas)
    atlasTexure: cc.SpriteAtlas = null;

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new M3AtlasTileMapAssembler2D();
        this._assembler.init(this);
    }

    start() {
        this.loadAtlas();

        // this.DrawTexture("Wall_bottom", cc.v2(30, 30), cc.color(255, 0, 0, 255));
        // this.DrawTexture("Wall_top", cc.v2(60, 0), cc.color());

        this.schedule(() => {
            this.___test();
        }, 0.02);
    }

    private _alpha = 0;
    private ___test() {
        this.Clear();
        this.DrawTexture("Wall_top", cc.v2(60, 0), cc.color(255, 0, 0));
        this._alpha = Math.min(this._alpha + 1, 255);

        this.DrawTexture("Wall_bottom", cc.v2(30, 30), cc.color(0, 255, 0, this._alpha), cc.color(255, 0, 0, this._alpha), cc.color(0, 0, 255, this._alpha), cc.color(255, 255, 255, this._alpha));
        if (this._alpha >= 255) this._alpha = 0;

    }

    private _atlasTexture: cc.SpriteAtlas = null;

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

    public get colors() {
        return this._colors;
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

        this.spritePoses.push(pos.x, pos.y);
        this.addLocals(spriteFrame);
        this._spriteUvs = this._spriteUvs.concat(spriteFrame.uv);
        this.addColors(color1, color2, color3, color4);
        this.setVertsDirty();
    }

    private addLocals(spriteFrame: cc.SpriteFrame) {
        let sw = spriteFrame._originalSize.width;
        let sh = spriteFrame._originalSize.height;
        let appx = this.node.anchorX * sw;
        let appy = this.node.anchorY * sh;
        let l, b, r, t;
        if (this.trim) {
            l = -appx;
            b = -appy;
            r = sw - appx;
            t = sh - appy;
        } else {
            let frame = spriteFrame,
                ow = frame._originalSize.width, oh = frame._originalSize.height,
                rw = frame._rect.width, rh = frame._rect.height,
                offset = frame._offset,
                scaleX = sw / ow, scaleY = sh / oh;
            let trimLeft = offset.x + (ow - rw) / 2;
            let trimRight = offset.x - (ow - rw) / 2;
            let trimBottom = offset.y + (oh - rh) / 2;
            let trimTop = offset.y - (oh - rh) / 2;
            l = trimLeft * scaleX - appx;
            b = trimBottom * scaleY - appy;
            r = sw + trimRight * scaleX - appx;
            t = sh + trimTop * scaleY - appy;
        }
        this._locals.push(l, b, r, t);
    }

    private addColors(color1?, color2?, color3?, color4?) {
        if (color2 && color3 && color4) {
            this._colors.push(color1._val, color2._val, color3._val, color4._val);
        } else {
            this._colors.push(color1._val, color1._val, color1._val, color1._val);
        }
    }

    onDestroy() {
        this._spriteUvs = null;
        this._spritePoses = null;
        this._spriteCount = 0;
    }

    public Clear() {
        this._spriteCount = 0;
        this._spriteUvs = [];
        this._spritePoses = [];
        this._locals = [];
        this._colors = [];
    }
}