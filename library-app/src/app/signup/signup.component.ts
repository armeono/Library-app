import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUser: IUser = { 
    username: "",
    password: ""
  }

  errors: any = []

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(name: any, pass: any){

    this.newUser = {
      username: name,
      password: pass
    }

    const passField = <HTMLInputElement>document.getElementById('passField')
    const usernameField = <HTMLInputElement>document.getElementById('usernameField')

    if(passField.value == "" || usernameField.value == ""){

    
      passField.style.border = "1px solid red"
      usernameField.style.border = "1px solid red"

      this.errors = []

      this.errors.push("Fields cannot be empty! Please try again!")



      
    }else { 

    this.userService.createUser(this.newUser)

    this.router.navigate(['/login'])

  }
}

}
