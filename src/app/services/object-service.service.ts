import { Injectable } from '@angular/core';

import { Vector3, Line, GeometricObject, LineSegment, Plane, Scalar } from '../model/';

@Injectable()
export class ObjectService {

  // Array of geometrical objects (and scalars)
  private static objects: GeometricObject[];
  private static objectsData: ObjectData[];
  private static selectedMap: { [objectIndex: number]: boolean };

  public static asObjectData(convertingObject: GeometricObject): ObjectData {
    if (!convertingObject.getType) {
      return null;
    }

    if (convertingObject.getType() === 'Scalar') {
      return new ObjectData(objectTypes['Scalar'], {
        Значение: (<Scalar>convertingObject).value
      });

    } else if (convertingObject.getType() === 'Vector3') {
      return new ObjectData(objectTypes['Vector3'], {
        Координаты: {
          x: (<Vector3>convertingObject).x,
          y: (<Vector3>convertingObject).y,
          z: (<Vector3>convertingObject).z
        }
      });
    } else if (convertingObject.getType() === 'Line') {
      return new ObjectData(objectTypes['Line'], {
        A: {
          x: (<Line>convertingObject).a.x,
          y: (<Line>convertingObject).a.y,
          z: (<Line>convertingObject).a.z
        },
        B: {
          x: (<Line>convertingObject).b.x,
          y: (<Line>convertingObject).b.y,
          z: (<Line>convertingObject).b.z
        }
      });
    } else if (convertingObject.getType() === 'LineSegment') {
      return new ObjectData(objectTypes['LineSegment'], {
        Начало: {
          x: (<LineSegment>convertingObject).start.x,
          y: (<LineSegment>convertingObject).start.y,
          z: (<LineSegment>convertingObject).start.z
        },
        Конец: {
          x: (<LineSegment>convertingObject).end.x,
          y: (<LineSegment>convertingObject).end.y,
          z: (<LineSegment>convertingObject).end.z
        }
      });
    } else if (convertingObject.getType() === 'Plane') {
      let planePoints = {};

      let pointChar = 'A';
      for (let point of (<Plane>convertingObject).points) {
        planePoints[pointChar] = { x: point.x, y: point.y, z: point.z };

        pointChar = String.fromCharCode(pointChar.charCodeAt(0) + 1);
      }

      return new ObjectData(objectTypes['Plane'], planePoints);
    }
    else {
      return null;
    }
  }

  public static asObjectDataIndex(index: number): ObjectData {
    if (index >= ObjectService.objects.length) {
      return new ObjectData("none", []);
    }

    if (ObjectService.objectsData[index]) {
      return ObjectService.objectsData[index];
    }

    let convertingObject = this.objects[index];

    return ObjectService.asObjectData(convertingObject);
  }

  public static typeOf(name: string): string {
    if (name === 'Скаляр') {
      return 'Scalar';
    } else if (name === 'Вектор') {
      return 'Vector3';
    } else if (name === 'Прямая') {
      return 'Line';
    } else if (name === 'Отрезок') {
      return 'LineSegment';
    } else if (name === 'Плоскость') {
      return 'Plane';
    }
  }

  constructor() {
    if (!ObjectService.objects && !ObjectService.selectedMap) {
      ObjectService.objects = [];
      ObjectService.selectedMap = {};
      ObjectService.objectsData = [];

      //DEBUG
      this.addObject(new Scalar(1488));
      this.addObject(new Vector3(1, 2, 3));
      this.addObject(new Line(new Vector3(1, 2, 2), new Vector3(3, 2, 2)));
      this.addObject(new LineSegment(new Vector3(1, 0, -9), new Vector3(1, 9, 7)));
      this.addObject(new Plane(new Vector3(1, 2, 2), new Vector3(3, 2, 2), new Vector3(2, -2, 8)));
    }
  }

  public getDescription(type: string): ObjectDescription {
    return declatedObjectsDesc[type];
  }

  public getDescriptionByName(name: string): ObjectDescription {
    return this.getDescription(this.typeOf(name));
  }

  public typeOf(name: string): string {
    for (let type in objectTypes) {
      if (objectTypes[type] === name) {
        return type;
      }
    }

    return "undefined";
  }

  public getObjects() { return ObjectService.objects; }

  public getSelected() {
    return this.getObjects().filter((v, i, arr) => { return ObjectService.selectedMap[i] });
  }

  public getSelectedObjectsMap() { return ObjectService.selectedMap; }

  public getObjectTypes() {
    let types: Array<string> = new Array<string>();
    for (let objClass in objectTypes) {
      types.push(objectTypes[objClass]);
    }

    return types;
  }

  public getObjectsData(): ObjectData[] {
    return ObjectService.objectsData;
  }

  public addObject(object: GeometricObject) {
    this.getObjects().push(object)
    this.getObjectsData().push(ObjectService.asObjectDataIndex(this.getObjects().length - 1));

    // Created objects are unselected
    this.getSelectedObjectsMap()[this.getObjects().length - 1] = false;
  }

  public createObject(objectData: ObjectData) {
    let object = this.parseObject(objectData);
    this.getObjectsData().push(objectData);

    if (object !== undefined)
      ObjectService.objects.push(object);
  }

  public editObject(objectData: ObjectData, index: number) {
    let object = this.parseObject(objectData);

    if (object !== undefined)
      ObjectService.objects[index] = object;
  }

  public removeObject(index: number) {
    if (index >= ObjectService.objects.length)
      return;

    ObjectService.objects.splice(index, 1);
  }

  public parseObject(objectData: ObjectData) {
    let parsed: any;

    try {
      if (objectData.type === objectTypes['Scalar']) {
        parsed = new Scalar(objectData.params['Значение']);

      } else if (objectData.type === objectTypes['Vector3']) {
        let point = objectData.params['Координаты'];
        parsed = new Vector3(point.x, point.y, point.z);

      } else if (objectData.type === objectTypes['Line']) {
        let point1 = objectData.params['A'];
        let point2 = objectData.params['B'];

        parsed = new Line(new Vector3(point1.x, point1.y, point1.z), new Vector3(point2.x, point2.y, point2.z));

      } else if (objectData.type === objectTypes['LineSegment']) {
        let point1 = objectData.params['Начало'];
        let point2 = objectData.params['Конец'];

        parsed = new LineSegment(new Vector3(point1.x, point1.y, point1.z), new Vector3(point2.x, point2.y, point2.z));


      } else if (objectData.type === objectTypes['Plane']) {
        let point1 = objectData.params['A'];
        let point2 = objectData.params['B'];
        let point3 = objectData.params['C'];

        parsed = new Plane(new Vector3(point1.x, point1.y, point1.z),
          new Vector3(point2.x, point2.y, point2.z),
          new Vector3(point3.x, point3.y, point3.z));
      }
    } catch (e) {
      parsed = undefined;
    }

    return parsed;
  }
}

export const objectTypes = {
  Scalar: 'Скаляр',
  Vector3: 'Вектор',
  Line: 'Прямая',
  LineSegment: 'Отрезок',
  Plane: 'Плоскость'
}

export class ObjectData {
  public constructor(public type: string, public params: { [label: string]: any }) { }
}

export class ObjectDescription {
  constructor(public type?: string, public params?: { [label: string]: string }) { }
}

export const declatedObjectsDesc: { [type: string]: ObjectDescription } = {
  Scalar: new ObjectDescription(objectTypes['Scalar'], { 'Значение': 'number' }),
  Vector3: new ObjectDescription(objectTypes['Vector3'], { 'Координаты': 'point' }),
  Line: new ObjectDescription(objectTypes['Line'], { 'A': 'point', 'B': 'point' }),
  LineSegment: new ObjectDescription(objectTypes['LineSegment'], { 'Начало': 'point', 'Конец': 'point' }),
  Plane: new ObjectDescription(objectTypes['Plane'], { 'A': 'point', 'B': 'point', 'C': 'point' }),
};
