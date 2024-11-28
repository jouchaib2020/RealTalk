import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UserInterface } from '../user-interface';
import { TestServiceService } from '../test-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
})
export class UserCompComponent {
  @Input() selectedUser: UserInterface | undefined;
}
@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [CommonModule, UserCompComponent, ReactiveFormsModule],
  templateUrl: './comp.component.html',
})
export class CompComponent {
  userService = inject(TestServiceService);
  users: UserInterface[] | undefined;
  loading: boolean = true;
  errorMessage: string | undefined;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  @Input() inputFunction!: () => void;

  ngOnInit() {
    if (this.users?.length === 0) {
      this.userService.fetchUsers(9).subscribe();
    }
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('users from subscribe', users);
        return setTimeout(() => {
          this.users = users;
          this.loading = false;
        }, 1000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error
          ? error.message
          : 'An error occurred while fetching users';
      },
    });
  }

  onSubmit() {
    this.userService.createUser(this.searchForm.value.search);
  }
  onchange() {
    console.log('changed');
  }

  clickHandler() {
    console.log('clicked');
  }
}
