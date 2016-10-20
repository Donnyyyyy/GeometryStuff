import { TestBed } from '@angular/core/testing';
import { Vector3, PlaneEquation, Plane, GeometryUtils } from './';

describe('Model: Plane', () => {

    it('should correctly create PlaneEquation', () => {
        let p1: Vector3 = new Vector3(-3, 2, -1);
        let p2: Vector3 = new Vector3(-1, 2, 4);
        let p3: Vector3 = new Vector3(3, 3, -1);

        let equation: PlaneEquation = PlaneEquation.fromPoints(p1, p2, p3);

        expect(equation.a).toEqual(-5);
        expect(equation.b).toEqual(30);
        expect(equation.c).toEqual(2);
        expect(equation.d).toEqual(-73);
    });

    it('should correctly return normal', () => {
        let p1: Vector3 = new Vector3(-3, 2, -1);
        let p2: Vector3 = new Vector3(-1, 2, 4);
        let p3: Vector3 = new Vector3(3, 3, -1);

        let plane: Plane = new Plane(p1, p2, p3);
        let normal = plane.getNormal();

        expect(normal.x).toEqual(-5);
        expect(normal.y).toEqual(30);
        expect(normal.z).toEqual(2);
    });


    it('should normalize plane equation', () => {
        let eq: PlaneEquation = new PlaneEquation(1, 2, 3, 2);
        eq.nomalize();

        expect(new Vector3(eq.a, eq.b, eq.c).length())
            .toEqual(1);

        expect(GeometryUtils.areCollinear(new Vector3(eq.a, eq.b, eq.c), new Vector3(1, 2, 3)))
            .toBeTruthy();
    });
});