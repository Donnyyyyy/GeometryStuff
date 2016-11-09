import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ObjectManipulatorComponent } from './object-manipulator/object-manipulator.component';
import { ObjectService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(ObjectManipulatorComponent) objectManipulator: ObjectManipulatorComponent;

  public toggleEdition(index){
    this.objectManipulator.openObjectForm('Edit', index, ObjectService.asObjectDataIndex(index));
  }

  ngAfterViewInit(){
  }
}
