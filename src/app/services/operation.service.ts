import { Injectable } from '@angular/core';

import { GeometricOperation, Operations, ObjectService, ParameterManager } from './';
import { GeometricObject, Vector3, GeometryUtils } from '../model';

@Injectable()
export class OperationService {

  private static operations: GeometricOperation[];
  private parameters: GeometricObject[];
  private parameterManager: ParameterManager;

  constructor() {
    if (!OperationService.operations) {
      OperationService.operations = Operations.get();
    }
    this.parameters = [];
    this.parameterManager = new ParameterManager();
  }

  public getOperations(): GeometricOperation[] {
    return OperationService.operations;
  }

  public setActiveOperation(operation: GeometricOperation) {
    this.parameterManager.requiredSignature = operation.parameters;
  }

  public areParametersValid(): boolean {
    return this.parameterManager.isValid();
  }

  public addParameter(parameter: GeometricObject) {
    this.parameters.push(parameter);
    this.parameterManager.add(parameter.getType());
  }

  public removeParameter(parameter: GeometricObject) {
    this.parameters.splice(this.parameters.indexOf(parameter));
    this.parameterManager.remove(parameter.getType());
  }
}
