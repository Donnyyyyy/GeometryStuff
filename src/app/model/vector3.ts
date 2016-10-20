import { VectorSequence } from './';

export class Vector3 implements VectorSequence {

    public static i: Vector3 = new Vector3(1, 0, 0);
    public static j: Vector3 = new Vector3(0, 1, 0);
    public static k: Vector3 = new Vector3(0, 0, 1);

    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public length(): number {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2));
    }

    /**
     * return self
     */
    public add(vector: Vector3): Vector3 {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
    }

    /**
     * multiplies returns self
     */
    public mul(factor: number): Vector3 {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;

        return this;
    }

    /**
     *  Note: will not modify this
     */
    public getReverse() {
        return this.copy().mul(-1);
    }

    public toArr() {
        return [this.x, this.y, this.z];
    }

    public toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    public copy() {
        return new Vector3(this.x, this.y, this.z);
    }

    public asVector3Arr() {
        return [this.copy()];
    }

    public equals(another: Vector3) {
        return (this.x === another.x
            && this.y === another.y
            && this.z === another.z);
    }
}
