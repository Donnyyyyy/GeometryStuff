import { Component, OnInit, AfterViewInit } from '@angular/core';

import { OperationService } from '../services';
import { GeometricOperation, ObjectService, ObjectData, objectTypes } from '../services';

declare var $: any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, AfterViewInit {

  operations: GeometricOperation[];
  selected: GeometricOperation;
  prettyNames = objectTypes;

  constructor(private operationService: OperationService,
    private objectService: ObjectService) {

    this.operations = operationService.getOperations();
  }

  private setSelected(operation: GeometricOperation) {
    this.selected = operation;
    this.operationService.setActiveOperation(operation);
  }

  private convert(object){
    return ObjectService.asObjectData(object);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });
  }
}
