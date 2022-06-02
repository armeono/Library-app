import { Component, OnInit } from '@angular/core';

import { BookapiService } from '../bookapi.service';
import { IBooks } from '../books';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  booksInfo: IBooks = {
    title: '',
    author: '',
    thumbnail: '',
    description: '',
    publisher: '',
    categories: ''
  }


  constructor(private bookService: BookapiService) {}

  ngOnInit(): void {

    this.bookService.currentInfo.subscribe(data => {

      this.booksInfo = data

      console.log(data)

    })
    


    }




      
}

