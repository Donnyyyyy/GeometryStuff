import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { ObjectService, ObjectDescription, ObjectData, declatedObjectsDesc } from '../services';
import { Vector3 } from '../model';
declare var $: any;

@Component({
  selector: 'app-object-manipulator',
  templateUrl: './object-manipulator.component.html',
  styleUrls: ['./object-manipulator.component.css']
})
export class ObjectManipulatorComponent implements OnInit, AfterViewInit {

  // Edit/Create
  mode: string;
  editableIndex: number;

  aviableObjectTypes: string[];
  objectsDescriptions: { [type: string]: ObjectDescription } = declatedObjectsDesc;

  selectedType: string;
  params: { [label: string]: any };
  paramsDesc: { [label: string]: string };

  constructor(private objectService: ObjectService) {
    this.aviableObjectTypes = objectService.getObjectTypes();
    this.params = {};
  }

  getParamsKeys(): string[] {
    let keys = Object.keys(this.params);
    return keys;
  }

  updateParams() {
    setTimeout(() => {
      this.params = {};

      let objectDesc = this.objectService.getDescriptionByName(this.selectedType);
      this.paramsDesc = objectDesc.params;

      for (let param in this.paramsDesc) {
        let parameterType = this.paramsDesc[param];
        if (parameterType === 'point') {
          this.params[param] = { x: 0, y: 0, z: 0 };
        }
        else if (parameterType === 'number') {
          this.params[param] = 0;
        }
      }
    }, 20);
  }

  doneManipulations() {
    let processedObject: ObjectData = new ObjectData(this.selectedType, this.params);

    if (this.mode == 'New')
      this.objectService.createObject(processedObject);
    else {
      this.objectService.editObject(processedObject, this.editableIndex);
    }
  }

  ngOnInit() {
  }

  openObjectForm(mode: string, editableIndex?: number, editableObject?: ObjectData) {
    if (mode === 'New')
      this.initNewObject();
    else if (mode === 'Edit' && editableObject && editableIndex !== undefined) {
      this.initEdit(editableIndex, editableObject);
    }
    else return;

    this.mode = mode;
    $('#objectForm').openModal();
  }

  // TODO re-write
  initEdit(editableIndex: number, editableObject: ObjectData) {
    this.selectedType = editableObject.type;
    this.editableIndex = editableIndex;
    this.params = editableObject.params;
  }

  initNewObject() {
    if (this.aviableObjectTypes.length > 0) {
      this.selectedType = this.aviableObjectTypes[0];
      this.params = {};
      this.updateParams();
    }
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.modal-trigger').leanModal();
    });
  }
}
