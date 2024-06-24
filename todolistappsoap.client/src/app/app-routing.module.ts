import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { AddToDoComponent } from './components/add-to-do/add-to-do.component';
import { EditToDoComponent } from './components/edit-to-do/edit-to-do.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'todos', component: ToDoListComponent },
  { path: 'add-todo', component: AddToDoComponent },
  { path: 'edit-todo/:id', component: EditToDoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
