import { Injectable } from '@angular/core';

import { GeometricOperation } from './';
import { GeometricObject, Vector3, GeometryUtils } from '../model';

@Injectable()
export class OperationService {

  private static operations = [];

  private static selected: GeometricObject[] = [];

  constructor() { }

  public getOperations(): GeometricOperation[] {
    OperationService.operations.push(new GeometricOperation('cyka', 'blad'));
    return OperationService.operations;
  }

  public select(object: GeometricObject) {
    OperationService.selected.push(object);
  }

}
