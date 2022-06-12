import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {IBooks} from './books'



@Injectable({
  providedIn: 'root'
})
export class BookapiService {


  private booksInfo = new BehaviorSubject<IBooks>({title: 'Book Title', author: 'Author', thumbnail: 'Image', description: 'Description goes here', publisher: 'Yep', categories: 'Fiction'});

  currentInfo = this.booksInfo.asObservable();

  url: string = "http://localhost:8080/books"

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBooks[]>{
    return this.http.get<IBooks[]>(this.url)

    
  }

   changeInfo(book: IBooks){

    this.booksInfo.next(book);
    

  }


}
