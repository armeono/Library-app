import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { IUser } from '../user';
import { empty } from 'cheerio/lib/api/manipulation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  user: IUser = {
    username: '',
    password: ''
  }

  errors: any = []

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }

  getUserData(getUsername: string, getPassword: string){

    this.user = { 
      username: getUsername,
      password: getPassword
    }

    const passField = <HTMLInputElement>document.getElementById('passField')
    const usernameField = <HTMLInputElement>document.getElementById('usernameField')

    if(passField.value == "" || usernameField.value == ""){

      console.log("Object is empty")
    
      passField.style.border = "1px solid red"
      usernameField.style.border = "1px solid red"

      this.errors = []

      this.errors.push("User not found! Please try again!")



      
    }else { 

      this.userService.checkUser(this.user).subscribe(res => {

        console.log(res)

        if(res == "Login Successful!"){ 

          this.router.navigate(['/'])

          this.userService.changeUser(this.user)

        }else if(res == "Login Failed! Please try again!"){

          passField.style.border = "1px solid red"
          usernameField.style.border = "1px solid red"

          this.errors = []

          this.errors.push(res)

          console.log(this.errors)

      
        }
      })



    }



   







  }

  goToSignUp(){
    this.router.navigate(['/signup'])
  }

}
