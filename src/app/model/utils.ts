import { Vector3, Line, Plane, PlaneEquation, Matrix, LineSegment } from './';

export class GeometryUtils {

    public static mixedProduct(a: Vector3, b: Vector3, c: Vector3): number {
        let mixedProd: Matrix = new Matrix([
            a.toArr(),
            b.toArr(),
            c.toArr()
        ]);
        return mixedProd.determinant3x3();
    }

    public static scalarProduct(a: Vector3, b: Vector3): number {
        return b.x * a.x
            + b.y * a.y
            + b.z * a.z;
    }

    public static vectorProduct(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    public static areCollinear(a: Vector3, b: Vector3): boolean {
        return (a.x / b.x) === (a.y / b.y)
            && (a.y / b.y) === (a.z / b.z);
    }

    public static areComplanar(a: Vector3, b: Vector3, c: Vector3): boolean {
        return GeometryUtils.mixedProduct(a, b, c) === 0;
    }

    /**
     * In case of 
     *  - left: returns -1
     *  - right: return 1
     *  - undefined orientation: (vectors are linearly dependent): return 0
     */
    public static getVectorTripleOrientation(a: Vector3, b: Vector3, c: Vector3): number {
        let vectorTripleMatrix: Matrix = new Matrix([
            a.toArr(),
            b.toArr(),
            c.toArr()
        ]);
        let determinant3x3: number = vectorTripleMatrix.determinant3x3();

        if (determinant3x3 > 0) {
            return 1;
        } else if (determinant3x3 < 0) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * Returns null if given basis vectors aren't basis.
     */
    public static extendToBasis(vector: Vector3,
        basis1: Vector3, basis2: Vector3, basis3: Vector3): Vector3 {
        let vectorEquation: Matrix = new Matrix([
            [basis1.x, basis2.x, basis3.x, vector.x],
            [basis1.y, basis2.y, basis3.y, vector.y],
            [basis1.z, basis2.z, basis3.z, vector.z]
        ]);

        return vectorEquation.solveKramer4x3();
    }

    public static getAngleVectors(a: Vector3, b: Vector3): number {
        let angleCos: number = GeometryUtils.scalarProduct(a, b) /
            (a.length() * b.length());

        return Math.acos(angleCos) * 180 / Math.PI;
    }

    public static getCosVectors(a: Vector3, b: Vector3): number {
        return GeometryUtils.scalarProduct(a, b) /
            (a.length() * b.length());
    }

    /**
     * Divides the segment in the given proportions (factor) and return devide point
     */
    public static divide(segment: LineSegment, factor: number): Vector3 {
        let direction: Vector3 = segment.asVector3();

        return segment.start.copy().add(direction.mul(factor));
    }

    public static distancePointPoint(a: Vector3, b: Vector3): number {
        return b.copy().add(a.getReverse()).length();
    }

    public static projectPointLine(point: Vector3, line: Line): Vector3 {
        let lineDir: Vector3 = line.getDirection();
        let orthogonalPlaneEq: PlaneEquation = PlaneEquation.fromNormal(lineDir, point);

        return GeometryUtils.intersectLinePlaneEq(line, orthogonalPlaneEq);
    }

    /**
     * return intersection point or line+
     */
    public static intersectLinePlane(line: Line, plane: Plane): any {
        return GeometryUtils.intersectLinePlaneEq(line, plane.equation);
    }

    /**
     * Similar to intersectLinePlane(line: Line, plane: Plane): any, but requires plane equations.
     */
    public static intersectLinePlaneEq(line: Line, planeEq: PlaneEquation): any {
        let lineEq = line.equation;

        let sum: number = lineEq.xEquation.coefficients[0] * planeEq.a
            + lineEq.yEquation.coefficients[0] * planeEq.b
            + lineEq.zEquation.coefficients[0] * planeEq.c
            + planeEq.d;

        let parameterFactor = -(
            lineEq.xEquation.coefficients[1] * planeEq.a
            + lineEq.yEquation.coefficients[1] * planeEq.b
            + lineEq.zEquation.coefficients[1] * planeEq.c
        );

        let parameter = sum / parameterFactor;

        //  plane contains line 
        if (sum === 0 && parameterFactor === 0) {
            return line;
        }
        //they are parallel
        if (sum !== 0 && parameterFactor === 0) {
            return undefined;
        }

        return new Vector3(
            lineEq.xEquation.coefficients[0] + parameter * lineEq.xEquation.coefficients[1],
            lineEq.yEquation.coefficients[0] + parameter * lineEq.yEquation.coefficients[1],
            lineEq.zEquation.coefficients[0] + parameter * lineEq.zEquation.coefficients[1]
        );
    }

    public static distanceLinePoint(line: Line, point: Vector3): number {
        let projection: Vector3 = GeometryUtils.projectPointLine(point, line);

        return GeometryUtils.distancePointPoint(point, projection);
    }

    public static projectPointPlane(point: Vector3, plane: Plane): Vector3 {
        let orthogonalLineDir: Vector3 = plane.getNormal();
        let orthogonalLine: Line = new Line(point, point.copy().add(orthogonalLineDir));

        return GeometryUtils.intersectLinePlane(orthogonalLine, plane);
    }

    public static distancePointPlane(point: Vector3, plane: Plane): number {
        let projected: Vector3 = GeometryUtils.projectPointPlane(point, plane);
        return GeometryUtils.distancePointPoint(point, projected);
    }

    public static projectLinePlane(line: Line, plane: Plane): any {
        let projectedA: Vector3 = GeometryUtils.projectPointPlane(line.a, plane);
        let projectedB: Vector3 = GeometryUtils.projectPointPlane(line.b, plane);

        if (projectedA.equals(projectedB)) {
            return projectedA;
        } else {
            return new Line(projectedA, projectedB);
        }
    }

    public static distanceLinePlane(line: Line, plane: Plane): number {
        if (GeometryUtils.intersectLinePlane(line, plane) !== undefined) {
            return 0;
        } else {
            return GeometryUtils.distancePointPlane(line.a, plane);
        }
    }

    public static intersectPlanePlane(plane1: Plane, plane2: Plane): Line {
        return Line.fromPlanes(plane1, plane2);
    }

    public static distancePlanePlane(plane1: Plane, plane2: Plane): number {
        let projected: Vector3 = GeometryUtils.projectPointPlane(plane1.points[0], plane2);

        return GeometryUtils.distancePointPoint(plane1.points[0], projected);
    }

    public static getAngleLineLine(line1: Line, line2: Line): number {
        return GeometryUtils.getAngleVectors(line1.getDirection(), line2.getDirection());
    }

    public static getAngleLinePlane(line: Line, plane: Plane): number {
        return GeometryUtils.getAngleLineLine(line, GeometryUtils.projectLinePlane(line, plane));
    }

    public static tetrahedronVolume(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3) {
        let a = p4.copy().add(p1.getReverse());
        let b = p4.copy().add(p2.getReverse());
        let c = p4.copy().add(p3.getReverse());

        return Math.abs(GeometryUtils.mixedProduct(a, b, c) / 6);
    }

    public static getSquareTriangle(p1: Vector3, p2: Vector3, p3: Vector3) {
        let a = GeometryUtils.distancePointPoint(p1, p2);
        let b = GeometryUtils.distancePointPoint(p1, p3);
        let c = GeometryUtils.distancePointPoint(p2, p3);

        let semiperimeter = (a + b + c) / 2;

        return Math.sqrt(semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c));
    }
}
