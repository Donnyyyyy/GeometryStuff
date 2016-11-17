import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { ObjectService, OperationService, declatedObjectsDesc } from '../services';

declare var $: any;

@Component({
  selector: 'app-objects-outline',
  templateUrl: './objects-outline.component.html',
  styleUrls: ['./objects-outline.component.css']
})
export class ObjectsOutlineComponent implements OnInit, AfterViewInit {

  objects: any[];
  objectsData: any[];
  selectedMap: { [objectIndex: number]: boolean };
  declatedObjectsDesc = declatedObjectsDesc;

  @Output()
  editionToggled: EventEmitter<number> = new EventEmitter();

  toggleEdition(index: number) {
    this.editionToggled.emit(index);
  }

  constructor(private objectService: ObjectService,
    private operationService: OperationService) {

    this.objects = objectService.getObjects();
    this.selectedMap = objectService.getSelectedObjectsMap();
    this.objectsData = objectService.getObjectsData();
  }

  private updateSelection(index: number) {
    setTimeout(() => {
      if (this.selectedMap[index]) {
        // If selected object was checked
        this.operationService.addParameter(this.objects[index]);
      } else {
        // If selected object was unchecked
        this.operationService.removeParameter(this.objects[index]);
      }
    }, 50);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(() => {
    });
  }

}
