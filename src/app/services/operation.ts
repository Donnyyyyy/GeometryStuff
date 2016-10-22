import { GeometricObject } from '../model/';

export class GeometricOperation {

    public shortDescription: string;

    public fullDescription: string;

    public parameters: { [type: string]: number };

    public doOperation: (parameters: GeometricObject[]) => any;

    public constructor(shortDescription: string, fullDescription: string) {
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;

        console.log(shortDescription, fullDescription);
    }
}
