import { Component, OnInit } from '@angular/core';
import { BookapiService } from '../bookapi.service';
import { IBooks } from '../books';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {

  books: any;


  constructor(private userService: UsersService, private bookService: BookapiService) { }

  ngOnInit(): void {

    this.userService.getUserBooks().subscribe(books => {
      this.books = books

    })

    console.log(this.books)


  }


  getInfo(book: IBooks){

    this.bookService.changeInfo(book);

  

  }

}
