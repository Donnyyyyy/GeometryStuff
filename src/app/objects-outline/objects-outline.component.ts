import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ObjectService } from '../services';

@Component({
  selector: 'app-objects-outline',
  templateUrl: './objects-outline.component.html',
  styleUrls: ['./objects-outline.component.css']
})
export class ObjectsOutlineComponent implements OnInit {

  objects: any;

  @Output()
  editionToggled: EventEmitter<number> = new EventEmitter();

  toggleEdition(index: number) {
    this.editionToggled.emit(index);
  }

  constructor(private objectService: ObjectService) {
    this.objects = objectService.getObjects();
  }

  ngOnInit() {
  }

}
