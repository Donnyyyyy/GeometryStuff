import { GeometricObject } from '../model/';

export class GeometricOperation {

    public description: string;

    public parameters: { [type: string]: number };

    public callback: (parameters: GeometricObject[]) => any;

    public constructor(description: string, parametrs: { [type: string]: number },
        callback: (parameters: GeometricObject[]) => any) {

        this.description = description;
        this.parameters = parametrs;
        this.callback = callback;
    }
}
