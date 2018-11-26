import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

//authentication
import { AuthGuard } from './Auth/auth.guard';
import { LoginToken } from './shared/logintoken';

//shared objects
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';

// routing
import { Admin } from './admin/admin.component';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { ToolboxComponent } from './Admin/toolbox/toolbox.component';
import { EditTableComponent } from './Admin/edit-table/edit-table.component';
import { SelectTableComponent } from './Admin/select-table/select-table.component';

let routes = [
  { path: "", component: Home},
  { path: "Home", component: Home},
  { path: "Login", component: Login },
  { path: "Admin", component: Admin, canActivate: [AuthGuard] }
]


@NgModule({
  declarations: [
    AppComponent,
    Admin,
    Login,
    Home,
    ToolboxComponent,
    EditTableComponent,
    SelectTableComponent
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
  providers: [AuthGuard, LoginToken, AdminConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
