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
  objectsDescriptions: ObjectDescription[] = declatedObjectsDesc;

  selectedType: string;
  vertices: Array<Vector3>;

  constructor(private objectService: ObjectService) {
    this.aviableObjectTypes = objectService.getObjectTypes();
  }

  updateVerticesArray() {
    setTimeout(() => {
      let size: number = 0;

      for (let description of this.objectsDescriptions) {
        if (description.type == this.selectedType)
          size = description.verticesNumber;
      }

      while (this.vertices.length !== size) {
        if (this.vertices.length >= size)
          this.vertices.pop();
        else
          this.vertices.push(new Vector3(undefined, undefined, undefined));
      }
    }, 20);
  }

  doneManipulations() {
    let processedObject: ObjectData = new ObjectData(this.selectedType, this.vertices);

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

  initEdit(editableIndex: number, editableObject: ObjectData) {
    this.selectedType = editableObject.type;
    this.editableIndex = editableIndex;
    this.vertices = editableObject.vertices;
    this.updateVerticesArray();
  }

  initNewObject() {
    if (this.aviableObjectTypes.length > 0) {
      this.selectedType = this.aviableObjectTypes[0];
      this.vertices = new Array<Vector3>();
      this.updateVerticesArray();
    }
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
    });
  }
}
