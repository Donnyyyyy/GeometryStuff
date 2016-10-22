import { Vector3, PlaneEquation, GeometricObject} from './';

export class Plane implements GeometricObject{

    public points: Vector3[];
    public equation: PlaneEquation;

    public constructor(a: Vector3, b: Vector3, c: Vector3) {
        this.equation = PlaneEquation.fromPoints(a, b, c);

        this.points = new Array<Vector3>(a, b, c);
    }

    public getNormal(): Vector3 {
        return new Vector3(this.equation.a, this.equation.b, this.equation.c);
    }

    public asVector3Arr(){
        return this.points;
    }

    public getType(){
        return 'Plane';
    }
}
