import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { DelteUsersComponent } from './delte-users/delte-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { EditGroupsComponent } from './edit-groups/edit-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginFormComponent,
    DelteUsersComponent,
    EditUsersComponent,
    EditGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
