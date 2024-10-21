import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[] = [];
  title = 'angular-frontend';
  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  users: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  addUser() {
    const newUser = { firstName: this.firstName, lastName: this.lastName, age: this.age };
    this.dataService.addUser(newUser).subscribe(() => {
      this.loadUsers(); // Refrescar la tabla después de agregar
    });
  }
}
