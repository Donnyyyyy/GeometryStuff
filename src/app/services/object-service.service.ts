import { Injectable } from '@angular/core';

import { Vector3, Line } from '../model/';

@Injectable()
export class ObjectService {

  // Array of geometrical objects
  private static OBJECTS = [new Vector3(1, 2, 3), new Line(new Vector3(1, 2, 2), new Vector3(3, 2, 2))];

  public static asObjectData(index: number) {
    if (index >= ObjectService.OBJECTS.length)
      return new ObjectData("none", []);

    return new ObjectData(ObjectService.OBJECTS[index].toString(), ObjectService.OBJECTS[index].asVector3Arr());
  }

  constructor() { }

  public getObjects() { return ObjectService.OBJECTS; }

  public getObjectTypes() {
    let types: Array<string> = new Array<string>();
    for (let objClass in objectTypes) {
      types.push(objectTypes[objClass]);
    }

    return types;
  }

  public createObject(objectData: ObjectData) {
    let object = this.parseObject(objectData);

    if (object !== undefined)
      ObjectService.OBJECTS.push(object);
  }

  public editObject(objectData: ObjectData, index: number) {
    let object = this.parseObject(objectData);

    if (object !== undefined)
      ObjectService.OBJECTS[index] = object;
  }

  public removeObject(index: number) {
    if (index >= ObjectService.OBJECTS.length)
      return;

    ObjectService.OBJECTS.splice(index, 1);
  }

  private parseObject(objectData: ObjectData) {
    let parsed = undefined;

    declatedObjectsDesc.forEach((objectDesc) => {
      if (objectData.type == objectDesc.type) {

        // Check whether data is valid
        if (objectData.vertices.length !== objectDesc.verticesNumber) {
          parsed = undefined;
        }
        else {

          if (objectDesc.type === objectTypes['Vector3']) {
            parsed = new Vector3(objectData.vertices[0].x, objectData.vertices[0].y, objectData.vertices[0].z);
          } else if (objectDesc.type === objectTypes['Line']) {
            parsed = new Line(objectData.vertices[0].copy(), objectData.vertices[1].copy());
          }
        }
      }
    })
    return parsed;
  }
}

const objectTypes = {
  Vector3: 'Vector',
  Line: 'Line'
}

export class ObjectData {
  public constructor(public type: string, public vertices: Vector3[]) { }
}

export class ObjectDescription {
  constructor(public objectClass?: any, public type?: string, public verticesNumber?: number) { }
}

export const declatedObjectsDesc: [ObjectDescription] = [
  new ObjectDescription(Vector3, objectTypes['Vector3'], 1),
  new ObjectDescription(Line, objectTypes['Line'], 2)
]
