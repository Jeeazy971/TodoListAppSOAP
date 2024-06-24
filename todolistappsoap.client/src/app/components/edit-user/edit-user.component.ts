import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const updatedUser: User = {
      id: this.userId,
      name: this.userForm.value.name
    };

    this.userService.updateUser(updatedUser).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
