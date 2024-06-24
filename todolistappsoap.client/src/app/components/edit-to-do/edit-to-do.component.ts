import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SoapService } from '../../services/soap.service';
import { ToDoItem } from '../../models/todo-item.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.component.html',
  styleUrls: ['./edit-to-do.component.css']
})
export class EditToDoComponent implements OnInit {
  toDoForm: FormGroup;
  submitted = false;
  users: User[] = [];
  toDoItemId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
    this.toDoItemId = this.route.snapshot.params['id'];
    this.loadToDoItem(this.toDoItemId);
    this.loadUsers();
  }

  loadToDoItem(id: number): void {
    this.soapService.getToDoItem(id).subscribe(item => {
      this.toDoForm.patchValue({
        title: item.title,
        userId: item.userId
      });
    });
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

    const updatedToDo: ToDoItem = {
      id: this.toDoItemId,
      title: this.f['title'].value,
      isCompleted: false,
      userId: this.f['userId'].value,
    };

    this.soapService.updateToDoItem(updatedToDo).subscribe(() => {
      this.router.navigate(['/todos']);
    });
  }
}
