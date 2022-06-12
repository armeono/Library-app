import { Component, OnInit } from '@angular/core';

import { BookapiService } from '../bookapi.service';
import { IBooks } from '../books';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public books: any= []





  booksInfo: IBooks = {
    title: '',
    author: '',
    thumbnail: '',
    description: '',
    publisher: '',
    categories: ''
  }


  constructor(private bookService: BookapiService, private userService: UsersService) {}

  ngOnInit(): void {

    this.bookService.currentInfo.subscribe(data => {

      this.booksInfo = data


    })

    this.bookService.getBooks().subscribe(books => {
      
      this.books = books 


    })

    


    }



  getInfo(book: IBooks){

    this.bookService.changeInfo(book);

  

  }

  addBook(book: IBooks){

    this.userService.addBook(book);

    

  }


   




      
}

