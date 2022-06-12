import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBooks } from './books';
import {IUser} from './user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  defaultUser: IUser = { 
    username: "User",
    password: "Password"
  }

  private userInfo = new BehaviorSubject<IUser>(this.defaultUser);

  currentUser = this.userInfo.asObservable();

  url: string = "http://localhost:8080/login"

  newUserURL: string = "http://localhost:8080/createUser"

  addBookURL: string = "http://localhost:8080/addBook"

 

  constructor(private http: HttpClient) { }

  checkUser(user: IUser){

    return this.http.post<string>(this.url, user, {responseType: 'text' as 'json'});

  }

  changeUser(user: IUser){

    this.userInfo.next(user)

  }

  createUser(user: IUser){

    return this.http.post<IUser>(this.newUserURL, user).subscribe();

  }

  addBook(book: IBooks){

    return this.http.post<IBooks>(this.addBookURL,book).subscribe();
  }

  getUserBooks(){

    let currentUser = '';

    this.currentUser.subscribe(info => {
      currentUser = info.username;
    })

    console.log(currentUser)

    return this.http.get<IBooks>(`http://localhost:8080/getBooks/${currentUser}`);

  }
}
