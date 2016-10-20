import { Vector3, VectorSequence, LineEquation, GeometryUtils, Plane } from './';

export class Line implements VectorSequence {

    public a: Vector3;
    public b: Vector3;

    public equation: LineEquation;

    public static fromPlanes(plane1: Plane, plane2: Plane): Line {
        let equation: LineEquation = LineEquation.fromPlaneEqs(plane1.equation, plane2.equation);
        let fakeLine: Line = new Line(undefined, undefined);
        fakeLine.equation = equation;

        return fakeLine;
    }

    public constructor(a: Vector3, b: Vector3) {
        if (a && b) {
            this.a = a;
            this.b = b;

            this.equation = LineEquation.fromDirection(a, this.getDirection());
        }
    }

    public contains(point: Vector3): boolean {
        let xStep = point.x - this.equation.xEquation.coefficients[0];
        let yStep = point.y - this.equation.yEquation.coefficients[0];
        let zStep = point.z - this.equation.zEquation.coefficients[0];

        let xParameter = xStep / this.equation.xEquation.coefficients[1];
        let yParameter = yStep / this.equation.yEquation.coefficients[1];
        let zParameter = zStep / this.equation.zEquation.coefficients[1];

        // if this.equation.*Equation.coefficients[1] === 0 - compare numerator to 0
        let xParameterIsAny: boolean = this.equation.xEquation.coefficients[1] === 0 && xStep === 0;
        let yParameterIsAny: boolean = this.equation.yEquation.coefficients[1] === 0 && yStep === 0;
        let zParameterIsAny: boolean = this.equation.zEquation.coefficients[1] === 0 && zStep === 0;

        return ((xParameter === yParameter) || (xParameterIsAny || yParameterIsAny))
            && ((xParameter === zParameter) || (xParameterIsAny || zParameterIsAny))
            && ((yParameter === zParameter) || (yParameterIsAny || zParameterIsAny));
    }

    public getDirection(): Vector3 {
        let b = this.b;
        return b.copy().add(this.a.getReverse());
    }

    public toString() {
        return `Line: ${this.a} ${this.b}`;
    }

    public asVector3Arr() {
        return [this.a.copy(), this.b.copy()];
    }

    public equals(another: Line): boolean {
        return this.equation.equals(another.equation);
    }
}
