import { Component, OnInit, AfterViewInit } from '@angular/core';

import { OperationService } from '../services';
import { GeometricOperation } from '../services';

declare var $: any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, AfterViewInit {

  operations: GeometricOperation[];

  constructor(operationService: OperationService) {
    this.operations = operationService.getOperations();
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
