import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";

import { Admin } from './Admin/admin.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

let routes = [
  {path: "", component:Admin}
]


@NgModule({
  declarations: [
    AppComponent,
    Admin,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot(routes,
      {
        useHash: false,
        enableTracing: false // for debugging of the routes
      })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
