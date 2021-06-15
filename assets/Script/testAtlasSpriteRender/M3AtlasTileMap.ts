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

    @property(cc.SpriteAtlas)
    atlasTexure: cc.SpriteAtlas = null;

    public _resetAssembler() {
        this.setVertsDirty();
        this._assembler = new M3AtlasTileMapAssembler2D();
        this._assembler.init(this);
    }

    start() {
        this.loadAtlas();

        this.DrawTexture("Wall_bottom", cc.v2(30, 30));
        this.DrawTexture("Wall_top", cc.v2(60, 0));
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

    public loadAtlas() {
        this._atlasTexture = this.atlasTexure;
    }

    public DrawTexture(textureName: string, pos: cc.Vec2) {
        if (!this._atlasTexture) return;

        let spriteFrame = this._atlasTexture.getSpriteFrame(textureName);
        if (!spriteFrame) {
            return;
        }
        this._spriteCount++;

        this.spritePoses.push(pos.x, pos.y);
        this.addLocals(spriteFrame);
        this._spriteUvs = this._spriteUvs.concat(spriteFrame.uv);
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

    onDestroy() {
        this._spriteUvs = null;
        this._spritePoses = null;
        this._spriteCount = 0;
    }
}