import M3Assembler2D from "../testSpriteRenderComp/M3Assembler2D";
import M3AtlasAssembler2D from "./M3AtlasAssembler2D";
import { M3AtlasTileMap } from "./M3AtlasTileMap";


export default class M3AtlasTileMapAssembler2D extends M3AtlasAssembler2D {
    // 这部分使用SimpleSpriteAssembler的内容
    updateRenderData(sprite: M3AtlasTileMap) {
        // this.packToDynamicAtlas(sprite, sprite._spriteFrame);
        super.updateRenderData(sprite);
    }

    updateUVs(sprite: M3AtlasTileMap) {
        let uv = sprite.uvs;//sprite._spriteFrame.uv;
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];
        for (let i = 0; i < 4 * sprite.spriteCount; i++) {
            let srcOffset = i * 2;
            let dstOffset = floatsPerVert * i + uvOffset;
            verts[dstOffset] = uv[srcOffset];
            verts[dstOffset + 1] = uv[srcOffset + 1];
        }
    }

    updateVerts(sprite) {
        this._local = sprite.locals;
        for (let i = 0; i < sprite.spriteCount; i++) {
            this.updateWorldVerts(sprite, i);
        }
    }
}
