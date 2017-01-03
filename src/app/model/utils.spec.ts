import { TestBed } from '@angular/core/testing';
import { Matrix, GeometryUtils, Vector3, Polynomial, LineSegment, Line, Plane, LineEquation, PlaneEquation } from './';

describe('Model: Utils', () => {

    it('should calculate vector length', () => {
        let a: Vector3 = new Vector3(1, 2, 3);
        let b: Vector3 = new Vector3(1, 3, 4);

        expect(a.add(b)).toEqual(new Vector3(2, 5, 7));
    });

    it('should create Matrix 3x3', () => {
        let matrix = new Matrix([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
        expect(matrix).toBeTruthy();
    });

    it('should compute Matrix 3x3 determinant3x3', () => {
        let matrix = new Matrix([
            [1, 2, 3],
            [1, 1, 1],
            [1, 2, 1]
        ]);
        expect(matrix.determinant3x3()).toEqual(2);
    });

    it('should calculate mixed roduct of a, b, c', () => {
        let a = new Vector3(1, 2, 3);
        let b = new Vector3(1, 1, 1);
        let c = new Vector3(1, 2, 1);

        expect(GeometryUtils.mixedProduct(a, b, c))
            .toEqual(2);
    });

    it('should scalar multiply vectors', () => {
        let vector1 = new Vector3(1, -2, 0);
        let vector2 = new Vector3(4, 0, 88);

        expect(GeometryUtils.scalarProduct(vector1, vector2)).toEqual(1 * 4 + 0 * (-2) + 0 * 88);
    });

    it('should calculate vector multiplicaation of vectors', () => {
        let vector1 = new Vector3(75, 341, 11);
        let vector2 = new Vector3(98, 12, 234);
        let vectorProduct = GeometryUtils.vectorProduct(vector1, vector2);

        expect(vectorProduct).toEqual(new Vector3(79662, -16472, -32518));
    });

    it('should determine whether vectors are collinear (false)', () => {
        let a = new Vector3(68, 19, 9);
        let b = new Vector3(123, 9, 11);

        expect(GeometryUtils.areCollinear(a, b))
            .toBeFalsy();
    });

    it('should determine whether vectors are collinear (true)', () => {
        let a = new Vector3(68, 19, 9);
        let b = new Vector3(136, 38, 18);

        expect(GeometryUtils.areCollinear(a, b))
            .toBeTruthy();
    });

    it('should determine whether vectors are complanar (true)', () => {
        let a = new Vector3(68, 19, 9);
        let b = new Vector3(136, 38, 18);
        let c = new Vector3(1, 2, 1);

        expect(GeometryUtils.areComplanar(a, b, c))
            .toBeTruthy();
    });

    it('should determine whether vectors are complanar (false)', () => {
        let a = new Vector3(1, 2, 3);
        let b = new Vector3(1, 1, 1);
        let c = new Vector3(1, 2, 1);

        expect(GeometryUtils.areComplanar(a, b, c))
            .toBeFalsy();
    });

    it('should determine vector triple orientation (left)', () => {
        let a = new Vector3(6, 4, -8);
        let b = new Vector3(8, 3, 2);
        let c = new Vector3(2, 8, 1);

        expect(GeometryUtils.getVectorTripleOrientation(a, b, c))
            .toEqual(-1);
    });

    it('should determine vector triple orientation (right)', () => {
        let a = new Vector3(1, 2, 3);
        let b = new Vector3(1, 1, 1);
        let c = new Vector3(1, 2, 1);

        expect(GeometryUtils.getVectorTripleOrientation(a, b, c))
            .toEqual(1);
    });

    it('should determine vector triple orientation (undefined)', () => {
        let a = new Vector3(1, 1, 1);
        let b = new Vector3(-1, 0, 1);
        let c = new Vector3(2, 3, 4);

        expect(GeometryUtils.getVectorTripleOrientation(a, b, c))
            .toEqual(0);
    });

    it('should solve system of 3 equations', () => {
        let equation = new Matrix([
            [1, 4, 8, 8],
            [3, 2, 2, 8],
            [1, 9, 9, 1]
        ]);

        expect(equation.solveKramer4x3())
            .toEqual(new Vector3(14 / 5, -17 / 10, 3 / 2));
    });

    it('should try to solve system of 3 equations and catch zero-determinant', () => {
        let equation = new Matrix([
            [1, 1, 1, 8],
            [-1, 0, 1, 8],
            [2, 3, 4, 1]
        ]);

        expect(equation.solveKramer4x3())
            .toEqual(undefined);
    });

    it('should extend vector to a basis', () => {
        let vector: Vector3 = new Vector3(1, 2, 3);

        let basis1 = new Vector3(1, 4, 8);
        let basis2 = new Vector3(8, 3, 2);
        let basis3 = new Vector3(2, 8, 9);

        expect(GeometryUtils.extendToBasis(vector, basis1, basis2, basis3))
            .toEqual(new Vector3(7 / 29, 2 / 29, 3 / 29));
    });

    it('should try to extend vector to a basis (that is not correct) and return undefined', () => {
        let vector: Vector3 = new Vector3(1, 2, 3);

        let basis1 = new Vector3(1, 1, 1);
        let basis2 = new Vector3(-1, 0, 1);
        let basis3 = new Vector3(2, 3, 4);

        expect(GeometryUtils.extendToBasis(vector, basis1, basis2, basis3))
            .toEqual(undefined);
    });

    it('should compute angle between two vectors', () => {
        let a: Vector3 = new Vector3(1, 0, 0);
        let b: Vector3 = new Vector3(0, 1, 0);

        expect(GeometryUtils.getAngleVectors(a, b))
            .toEqual(90);
    });

    it('should compare two unequal Polynomials', () => {
        let a: Polynomial = new Polynomial(1, 0, 0);
        let b: Polynomial = new Polynomial(0, 1, 0);

        expect(a.equals(b))
            .toBeFalsy();
    });

    it('should compare two equal Polynomials', () => {
        let a: Polynomial = new Polynomial(1, 0, 1);
        let b: Polynomial = new Polynomial(1, 0, 1);

        expect(a.equals(b))
            .toBeTruthy();
    });

    it('should devide LineSegment in the given prporions', () => {
        let lineSegment: LineSegment = new LineSegment(new Vector3(1, 2, 3), new Vector3(3, -2, 2));

        expect(GeometryUtils.divide(lineSegment, 3 / (2 + 3)))
            .toEqual(new Vector3(
                1 + 2 * 3 / 5,
                2 + (-4 * 3 / 5),
                3 + (-1 * 3 / 5)
            ));
    });

    it('should calculate distance between two points', () => {
        let a: Vector3 = new Vector3(1, 2, 3);
        let b: Vector3 = new Vector3(3, 2, 2);

        expect(GeometryUtils.distancePointPoint(a, b))
            .toEqual(Math.sqrt(
                Math.pow(a.x - b.x, 2)
                + Math.pow(a.y - b.y, 2)
                + Math.pow(a.z - b.z, 2)
            ));
    });

    it('should intersect Line and plane and return point', () => {
        let fakeLine: Line = new Line(new Vector3(1, 1, 1), new Vector3(1, 1, 1));
        fakeLine.equation = new LineEquation(
            new Polynomial(-1, 4),
            new Polynomial(7, -7),
            new Polynomial(2, -3)
        );

        let fakePlane: Plane = new Plane(new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1));
        fakePlane.equation = new PlaneEquation(1, 4, 1, -2);

        expect(GeometryUtils.intersectLinePlane(fakeLine, fakePlane))
            .toEqual(new Vector3(3, 0, -1));
    });

    it('should intersect Line and plane and return line', () => {
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));
        let plane: Plane = new Plane(new Vector3(1, 1, 1), new Vector3(1, 2, 3), new Vector3(1, 2, 4));

        expect(GeometryUtils.intersectLinePlane(line, plane))
            .toEqual(new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4)));
    });

    it('should intersect parallel Line and plane and return nothing (undefined)', () => {
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));
        let plane: Plane = new Plane(new Vector3(1, 1, 2), new Vector3(1, 1, 3), new Vector3(0, 1, 2));

        expect(GeometryUtils.intersectLinePlane(line, plane))
            .toEqual(undefined);
    });

    it('should project point to the line', () => {
        let point: Vector3 = new Vector3(0, 1, -1);
        let line: Line = new Line(new Vector3(-2, 6, -1), new Vector3(-2, 6, -1).add(new Vector3(3, -4, 1)));

        expect(GeometryUtils.projectPointLine(point, line))
            .toEqual(new Vector3(1, 2, 0));
    });

    it('should project on the line point to this line and return initial point', () => {
        let point: Vector3 = new Vector3(4, -2, 1);
        let line: Line = new Line(new Vector3(-2, 6, -1), new Vector3(-2, 6, -1).add(new Vector3(3, -4, 1)));

        expect(GeometryUtils.projectPointLine(point, line))
            .toEqual(point);
    });

    it('should calculate distance between line and point', () => {
        let point: Vector3 = new Vector3(1, 2, 3).add(new Vector3(2, 1, 2));
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 3).add(new Vector3(2, 0, 2)));

        expect(GeometryUtils.distanceLinePoint(line, point))
            .toEqual(1);
    });

    it('should calculate distance between line and point', () => {
        let point: Vector3 = new Vector3(1, 2, 3).add(new Vector3(4, 0, 4));
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 3).add(new Vector3(2, 0, 2)));

        expect(GeometryUtils.distanceLinePoint(line, point))
            .toEqual(0);
    });

    it('should project point to the plane', () => {
        let point: Vector3 = new Vector3(1, 1, 1);
        let plane: Plane = new Plane(
            point.copy().add(new Vector3(1, 0, 0)),
            point.copy().add(new Vector3(0, 1, 0)),
            point.copy().add(new Vector3(0, 0, 1))
        );

        expect(GeometryUtils.projectPointPlane(point, plane))
            .toEqual(new Vector3(4 / 3, 4 / 3, 4 / 3));
    });

    it('should project point to the plane, containing this point', () => {
        let point: Vector3 = new Vector3(1, 1, 1);
        let plane: Plane = new Plane(
            point.copy().add(new Vector3(1, 0, 0)),
            point.copy().add(new Vector3(0, 4, 0)),
            point.copy().add(new Vector3(-1, 0, 0))
        );

        expect(GeometryUtils.projectPointPlane(point, plane))
            .toEqual(point);
    });

    it('should copmute distance between point and plane', () => {
        let point: Vector3 = new Vector3(1, 1, 1);
        let plane: Plane = new Plane(
            point.copy().add(new Vector3(1, 0, 0)),
            point.copy().add(new Vector3(0, 1, 0)),
            point.copy().add(new Vector3(0, 0, 1))
        );

        expect(GeometryUtils.distancePointPlane(point, plane))
            .toEqual(new Vector3(4 / 3, 4 / 3, 4 / 3).add(point.getReverse()).length());
    });

    it('should copmute distance between point and plane, containing this point', () => {
        let point: Vector3 = new Vector3(1, 1, 1);
        let plane: Plane = new Plane(
            point.copy().add(new Vector3(1, 0, 0)),
            point.copy().add(new Vector3(0, 4, 0)),
            point.copy().add(new Vector3(-1, 0, 0))
        );

        expect(GeometryUtils.distancePointPlane(point, plane))
            .toEqual(0);
    });

    it('should project line to the plane', () => {
        let testVector: Vector3 = new Vector3(0, 0, 0);

        let line: Line = new Line(testVector, testVector.copy().add(new Vector3(1, 1, 1)));
        let plane: Plane = new Plane(testVector, testVector.copy().add(new Vector3(2, 0, 0)), testVector.copy().add(new Vector3(0, 0, 2)));

        expect(GeometryUtils.projectLinePlane(line, plane))
            .toEqual(new Line(testVector, testVector.copy().add(new Vector3(1, 0, 1))));
    });

    it('should project orthogonal line to the plane', () => {
        let testVector: Vector3 = new Vector3(0, 0, 0);

        let line: Line = new Line(testVector, testVector.copy().add(new Vector3(0, 1, 0)));
        let plane: Plane = new Plane(testVector, testVector.copy().add(new Vector3(2, 0, 0)), testVector.copy().add(new Vector3(0, 0, 2)));

        expect(GeometryUtils.projectLinePlane(line, plane))
            .toEqual(new Vector3(0, 0, 0));
    });

    it('should calculate distance between parallel plane and line', () => {
        let line: Line = new Line(new Vector3(1, 1, 1), new Vector3(1, 1, 1).add(new Vector3(0, 1, 0)));
        let plane: Plane = new Plane(new Vector3(2, 1, 1), new Vector3(2, 1, 1).add(new Vector3(0, 2, 0)), new Vector3(2, 1, 1).add(new Vector3(0, 0, 2)));

        expect(GeometryUtils.distanceLinePlane(line, plane))
            .toEqual(1);
    });

    it('should calculate distance between non-parallel plane and line', () => {
        let line: Line = new Line(new Vector3(1, 1, 1), new Vector3(1, 1, 1).add(new Vector3(0, 1, 0)));
        let plane: Plane = new Plane(new Vector3(1, 1, 1), new Vector3(2, 1, 1).add(new Vector3(2, 0, 0)), new Vector3(2, 1, 1).add(new Vector3(0, 0, 2)));

        expect(GeometryUtils.distanceLinePlane(line, plane))
            .toEqual(0);
    });

    it('should convert plane Eqs to parametrical eq', () => {
        let planeEq1: PlaneEquation = new PlaneEquation(2, 1, -1, -1);
        let planeEq2: PlaneEquation = new PlaneEquation(1, 3, -2, 0);

        expect(LineEquation.fromPlaneEqs(planeEq1, planeEq2))
            .toEqual(new LineEquation(
                new Polynomial(3 / 5, 1 / 5),
                new Polynomial(-1 / 5, 3 / 5),
                new Polynomial(0, 1)
            ));
    });

    it('should calculate distance between parallel planes', () => {
        let plane1: Plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 2, 0));
        let plane2: Plane = new Plane(new Vector3(1, 0, 0), new Vector3(1, 0, 1), new Vector3(1, 2, 0));

        expect(GeometryUtils.distancePlanePlane(plane1, plane2))
            .toEqual(1);
    });

    it('should calculate triangle square', () => {
        let v1: Vector3 = new Vector3(0, 0, 0);
        let v2: Vector3 = new Vector3(1, 0, 0);
        let v3: Vector3 = new Vector3(0, 1, 0);

        expect(GeometryUtils.getSquareTriangle(v1, v2, v3) >= 0.49 && GeometryUtils.getSquareTriangle(v1, v2, v3) <= 0.51)
            .toBeTruthy();
    });

    it('should calculate tetrahedron volume', () => {
        let v1: Vector3 = new Vector3(1, 4, 8);
        let v2: Vector3 = new Vector3(8, 3, 2);
        let v3: Vector3 = new Vector3(2, 8, 9);
        let v4: Vector3 = new Vector3(3, 1, 4);

        expect(GeometryUtils.tetrahedronVolume(v1, v2, v3, v4))
            .toEqual(31 / 6);
    });
});
