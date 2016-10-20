import { TestBed, async } from '@angular/core/testing';
import { Vector3 } from './';

describe('Model: Vector3', () => {
    it('should create Vector3', () => {
        let vector = new Vector3(1, 2, 3);
        expect(vector).toBeTruthy();
    });

    it('should add one vector to another', () => {
        let vector1 = new Vector3(1, 2, 3);
        let vector2 = new Vector3(-1, -2, 3);
        let sum = vector1.add(vector2);

        expect(
            sum.x === 0
            && sum.y === 0
            && sum.z === 6
        ).toBeTruthy();

        expect(vector1).toBe(sum);
    });

    it('should multiply vector by a factor (positive)', () => {
        let vector = new Vector3(1, -2, 0);
        let multiplied = vector.mul(12);

        expect(
            multiplied.x === 12
            && multiplied.y === -24
            && multiplied.z === 0
        ).toBeTruthy();

        expect(vector).toBe(multiplied);
    });

    it('should multiply vector by a factor (negative)', () => {
        let vector = new Vector3(1, -2, 0);
        let multiplyid = vector.mul(-12);

        expect(
            multiplyid.x === -12
            && multiplyid.y === 24
            && multiplyid.z === 0
        ).toBeTruthy();

        expect(vector).toBe(multiplyid);
    });

    it('should multiply vector by a factor (zero)', () => {
        let vector = new Vector3(1, -2, 0);
        let multiplyid = vector.mul(0);

        expect(
            multiplyid.x === 0
            && multiplyid.y === 0
            && multiplyid.z === 0
        ).toBeTruthy();

        expect(vector).toBe(multiplyid);
    });

    it('should create reverse vector', () => {
        let vector = new Vector3(1, -2, 0);
        let reverse = vector.getReverse();

        expect(
            reverse.x === -vector.x
            && reverse.y === -vector.y
            && reverse.z === -vector.z
        ).toBeTruthy();
    });

    it('should correctly compare equal vectors', () => {
        let vector1 = new Vector3(1, -2, 0);
        let vector2 = new Vector3(1, -2, 0);

        expect(vector1).toEqual(vector2);
    });
});
