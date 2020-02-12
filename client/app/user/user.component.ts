import { Component, OnInit } from '@angular/core'
import { UserService } from '@app/user/user.service'
// import { User } from '@app/user/user.model'

export interface User {
  email?: string
  role?: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data
    }, error => console.log(error)
    );
  }

}
