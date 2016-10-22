import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { CodeComponent }    from './code/code.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: AppComponent, pathMatch: 'full' },
      { path: 'code', component: CodeComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}