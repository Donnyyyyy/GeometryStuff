import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ObjectsOutlineComponent } from './objects-outline/objects-outline.component';
import { ObjectService } from './services/';
import { ObjectManipulatorComponent } from './object-manipulator/object-manipulator.component';
@NgModule({
  declarations: [
    AppComponent,
    ObjectsOutlineComponent,
    ObjectManipulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ObjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
