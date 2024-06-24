import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SoapService } from '../../services/soap.service';
import { ToDoItem } from '../../models/todo-item.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {
  toDoForm: FormGroup;
  submitted = false;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private soapService: SoapService,
    private userService: UserService,
    private router: Router
  ) {
    this.toDoForm = this.formBuilder.group({
      title: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get f() {
    return this.toDoForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.toDoForm.invalid) {
      return;
    }

    const newToDo: ToDoItem = {
      id: 0,
      title: this.f['title'].value,
      isCompleted: false,
      userId: this.f['userId'].value,
    };

    this.soapService.addToDoItem(newToDo).subscribe(() => {
      this.router.navigate(['/todos']);
    });
  }
}
