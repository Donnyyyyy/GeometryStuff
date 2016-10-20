import { TestBed } from '@angular/core/testing';
import { Vector3, Line, LineEquation, Polynomial } from './';

describe('Model: Line', () => {

    it('should correctly create LineEquation', () => {
        let p1: Vector3 = new Vector3(1, 3, 3);
        let dir: Vector3 = new Vector3(2, -6, 0);

        let lineEq: LineEquation = LineEquation.fromDirection(p1, dir);

        expect(lineEq.xEquation)
            .toEqual(new Polynomial(1, 2));
        expect(lineEq.yEquation)
            .toEqual(new Polynomial(3, -6));
        expect(lineEq.zEquation)
            .toEqual(new Polynomial(3, 0));
    });

    it('Line should correctly create LineEquation', () => {
        let p1: Vector3 = new Vector3(1, 3, 3);
        let p2: Vector3 = new Vector3(3, -3, 3);

        let line: Line = new Line(p1, p2);

        expect(line.equation.xEquation)
            .toEqual(new Polynomial(1, 2));
        expect(line.equation.yEquation)
            .toEqual(new Polynomial(3, -6));
        expect(line.equation.zEquation)
            .toEqual(new Polynomial(3, 0));
    });

    it('should return direction', () => {
        let p1: Vector3 = new Vector3(1, 3, 3);
        let p2: Vector3 = new Vector3(3, -3, 3);
        let line: Line = new Line(p1, p2);

        expect(line.getDirection())
            .toEqual(new Vector3(2, -6, 0));
    });

    it('should compare self to another line', () => {
        let line1: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));
        let line2: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));

        expect(line1.equals(line2))
            .toBeTruthy();
    });

    it('should check whether line contains a point', () => {
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));
        let point: Vector3 = new Vector3(1, 2, 7);

        expect(line.contains(point))
            .toBeTruthy();
    });

    it('should check whether line contains a point', () => {
        let line: Line = new Line(new Vector3(1, 2, 3), new Vector3(1, 2, 4));
        let point: Vector3 = new Vector3(1, 3, 7);

        expect(line.contains(point))
            .toBeFalsy();
    });
});
