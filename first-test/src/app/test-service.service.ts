import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserInterface } from './user-interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  private http = inject(HttpClient);

  private baseUrl = 'https://randomuser.me/api/';

  private usersSubject = new BehaviorSubject<UserInterface[]>([]);

  fetchUsers(count: number) {
    console.log('fetching users');
    return this.http.get<any>(`${this.baseUrl}?results=${count}`).pipe(
      map((response) => {
        const users = response.results.map((user: any, idx: number) => ({
          id: idx,
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          avatar: user.picture.thumbnail,
          location: `${user.location.city}, ${user.location.country}`,
        }));
        this.usersSubject.next(users);
        return users;
      })
    );
  }

  logUsersChanged() {
    this.usersSubject.subscribe((users) => {
      console.log('users changed', users);
    });
  }

  getUsers() {
    return this.usersSubject.asObservable();
  }

  getUser(id: number) {
    return this.usersSubject.value.find((user) => user.id === id);
  }

  filterUsers(search: string) {
    return this.usersSubject.value.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  createUser(name?: string | null) {
    const ln = this.usersSubject.value.length;
    const newUser = {
      id: ln,
      name: name ? name : 'Unknown User',
      gender: 'male',
      avatar: `https://randomuser.me/api/portraits/men/${ln}.jpg`,
      location: 'Unknown Location',
    };
    this.usersSubject.next([newUser, ...this.usersSubject.value]);
    return newUser;
  }

  toString() {
    return JSON.stringify(this.usersSubject.value);
  }
}
