import { Component, OnInit } from '@angular/core';
import { BookapiService } from '../bookapi.service';
import { IBooks } from '../books';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public books: any= []


  constructor(private bookService: BookapiService) { }

  ngOnInit(): void {

      this.bookService.getBooks().subscribe(books => {
      
      this.books = books 


    })

  }


  getInfo(book: IBooks){

    this.bookService.changeInfo(book);

  

  }


}
