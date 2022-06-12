import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookapiService } from '../bookapi.service';
import { IBooks } from '../books';
import { IUser } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: any = "User"



  public books: any= []

  



  constructor(private bookService: BookapiService, 
    private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {

    

      this.bookService.getBooks().subscribe(books => {
      
      this.books = books 


    })

    this.userService.currentUser.subscribe(name => {
      this.currentUser = name.username
    })



  }


  getInfo(book: IBooks){

    this.bookService.changeInfo(book);

  

  }

  goToMyBooks(){
    this.router.navigate(['/myBooks'])
  }



}
