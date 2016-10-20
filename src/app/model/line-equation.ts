import { Polynomial, Vector3, PlaneEquation, GeometryUtils, Matrix } from './';

export class LineEquation {

    public xEquation: Polynomial;
    public yEquation: Polynomial;
    public zEquation: Polynomial;

    public static fromPlaneEqs(planeEq1: PlaneEquation, planeEq2: PlaneEquation) {
        let matrixZDet: number = new Matrix([
            [planeEq1.a, planeEq1.b],
            [planeEq2.a, planeEq2.b]
        ]).determinant2x2();

        return new LineEquation(
            new Polynomial((planeEq1.b * planeEq2.d - planeEq1.d * planeEq2.b) / matrixZDet,
                (planeEq1.b * planeEq2.c - planeEq1.c * planeEq2.b) / matrixZDet),

            new Polynomial((planeEq1.d * planeEq2.a - planeEq1.a * planeEq2.d) / matrixZDet,
                (planeEq1.c * planeEq2.a - planeEq1.a * planeEq2.c) / matrixZDet),

            new Polynomial(0, 1)
        );
    }

    public static fromDirection(point: Vector3, direction: Vector3) {
        return new LineEquation(
            new Polynomial(point.x, direction.x),
            new Polynomial(point.y, direction.y),
            new Polynomial(point.z, direction.z)
        );
    }

    public constructor(xEquation: Polynomial, yEquation: Polynomial, zEquation: Polynomial) {
        this.xEquation = xEquation;
        this.yEquation = yEquation;
        this.zEquation = zEquation;
    }

    public equals(another: LineEquation): boolean {
        return this.xEquation.equals(another.xEquation)
            && this.yEquation.equals(another.yEquation)
            && this.zEquation.equals(another.zEquation);
    }
}
