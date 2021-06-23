
export class MathUtils {
    public static lerp(v1, v2, t) {
        return (t <= 0) ? v1 : ((t >= 1) ? v2 : v1 + (v2 - v1) * t);
    }

    public static clamp(num, min, max) {
        return Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
    }

    public static fma(x: number, y: number, z: number) {
        return x * y + z;
    }

    public static GetAngle(pt1: cc.Vec2, pt2: cc.Vec2) {
        let angle = 0;
        let distance = cc.Vec2.distance(pt1, pt2);
        if (distance > 0) {
            angle = Math.acos((pt2.y - pt1.y) / distance);
            if (pt2.x < pt1.x) {
                angle = -angle;
            }
        }
        return angle;
    }

}

export class Common {
    static CELL_SIZE = 60;
}