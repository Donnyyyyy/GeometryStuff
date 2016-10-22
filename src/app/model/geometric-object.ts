import { Vector3 } from './'; 

export interface GeometricObject {

    asVector3Arr(): Vector3[];

    getType(): string;
}