import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  get f() { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const newUser: User = {
      id: 0,
      name: this.userForm.value.name
    };

    this.userService.addUser(newUser).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
