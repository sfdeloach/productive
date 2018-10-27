import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { NewuserComponent } from './newuser/newuser.component';
import { EdituserComponent } from './edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    ViewuserComponent,
    NewuserComponent,
    EdituserComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
