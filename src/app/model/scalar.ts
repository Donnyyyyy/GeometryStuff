import { GeometricObject } from './';

export class Scalar implements GeometricObject {

    public constructor(public value: number) { }

    public asVector3Arr() {
        return [];
    }

    public getType() {
        return 'Scalar';
    }

    public equals(another: Scalar) {
        return another.value === this.value;
    }
}