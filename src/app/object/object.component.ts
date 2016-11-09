import { Component, OnInit, Input } from '@angular/core';

import { ObjectData, ObjectDescription } from '../services';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  @Input()
  object: ObjectData;

  @Input()
  objectSignature: ObjectDescription;

  constructor() {
  }

  toString(parameter) {
    if (parameter.x !== undefined && parameter.y !== undefined && parameter.z !== undefined) {
      return `(${parameter.x}, ${parameter.y}, ${parameter.z})`;
    }
    else {
      return parameter.toString();
    }
  }

  getParamsKeys() {
    if (this.object.constructor === ObjectData) {
      return Object.keys(this.object.params);
    }
  }

  ngOnInit() {
  }

}
