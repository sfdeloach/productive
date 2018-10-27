import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user.http.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styles: []
})
export class UserlistComponent implements OnInit {
  users: any;

  constructor(private userHttpService: UserHttpService) {}

  ngOnInit() {
    this.userHttpService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
