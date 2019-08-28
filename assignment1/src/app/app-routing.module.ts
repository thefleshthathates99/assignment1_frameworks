import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DelteUsersComponent } from './delte-users/delte-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: '', component: LoginFormComponent},
  {path: 'deleteUsers', component: DelteUsersComponent},
  {path: 'editUsers', component: EditUsersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
