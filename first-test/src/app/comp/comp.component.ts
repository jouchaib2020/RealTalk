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
  users: UserInterface[] = [];
  filteredUsers: UserInterface[] = [];
  searchValue: string = '';

  loading: boolean = true;
  errorMessage: string | undefined;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  @Input() inputFunction!: () => void;

  ngOnInit() {
    this.userService.logUsersChanged();
    if (this.users?.length === 0) {
      this.userService.fetchUsers(9).subscribe();
    }
    setTimeout(() => {
      this.userService.getUsers().subscribe({
        next: (users) => {
          console.log('users from subscribe', users);
          this.users = users;
          this.filteredUsers = users;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error
            ? error.message
            : 'An error occurred while fetching users';
        },
      });
    }, 1000);

    // this.searchForm.valueChanges.subscribe((searchTerm) => {
    //   if (!searchTerm.search) {
    //     this.filteredUsers = this.users;
    //     return;
    //   }
    //   this.filteredUsers = this.userService.filterUsers(searchTerm.search);
    // });
  }

  onChange() {
    this.filteredUsers = this.userService.filterUsers(this.searchValue);
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
