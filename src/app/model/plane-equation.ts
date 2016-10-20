import {Vector3, GeometryUtils} from './';

export class PlaneEquation {

    public a: number;
    public b: number;
    public c: number;
    public d: number;

    public static fromNormal(normal: Vector3, planePoint: Vector3): PlaneEquation {
        let d: number = -GeometryUtils.scalarProduct(normal, planePoint);

        return new PlaneEquation(normal.x, normal.y, normal.z, d);
    }

    public static fromPoints(a: Vector3, b: Vector3, c: Vector3): PlaneEquation {
        let planeVector1: Vector3 = b.copy().add(a.getReverse());
        let planeVector2: Vector3 = c.copy().add(a.getReverse());

        let normal = GeometryUtils.vectorProduct(planeVector1, planeVector2);

        return PlaneEquation.fromNormal(normal, a);
    }

    public constructor(a: number, b: number, c: number, d: number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public nomalize(): void {
        let normal: Vector3 = new Vector3(this.a, this.b, this.c);

        let normalizedA: number = GeometryUtils.getCosVectors(normal, Vector3.i);
        let normalizedB: number = GeometryUtils.getCosVectors(normal, Vector3.j);
        let normalizedC: number = GeometryUtils.getCosVectors(normal, Vector3.k);

        let factor: number = normalizedA / this.a;
        this.d *= factor;

        if (this.d > 0) {
            factor *= -1;
        }

        this.a *= factor;
        this.b *= factor;
        this.c *= factor;
    }

    public equals(another: PlaneEquation): boolean {
        return this.a === another.a
            && this.b === another.b
            && this.c === another.c
            && this.d === another.d;
    }
}