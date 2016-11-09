import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ObjectsOutlineComponent } from './objects-outline/objects-outline.component';
import { ObjectService, OperationService } from './services/';
import { ObjectManipulatorComponent } from './object-manipulator/object-manipulator.component';
import { OperationsComponent } from './operations/operations.component';
import { CodeComponent } from './code/code.component';
import { AppRoutingModule } from './app-routing.module';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ObjectComponent } from './object/object.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectsOutlineComponent,
    ObjectManipulatorComponent,
    OperationsComponent,
    CodeComponent, 
    WrapperComponent, ObjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    AppRoutingModule
  ],
  providers: [ObjectService, OperationService],
  bootstrap: [WrapperComponent]
})
export class AppModule { }
