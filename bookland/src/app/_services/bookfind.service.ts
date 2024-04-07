import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IBook, IBookDetails, IBookPage, ICategory, IComment, ILanguage} from "../_models/book";
import {PageEvent} from "@angular/material/paginator";


@Injectable({
  providedIn: 'root'
})
export class BookfindService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

    getAllBooks(event: PageEvent | null) {
      let params = new HttpParams();
      if (event) {
        params = params.append('page', event.pageIndex);
        params = params.append('size', event.pageSize);
      }
      return this.http.get<IBookPage>(`${environment.apiUrl}/books`, {params: params})
  }

  getFilteredBooks(newObj: {}, event: PageEvent | null) {
    let params = new HttpParams({fromObject: newObj})
    if (event) {
      params = params.append('page', event.pageIndex);
      params = params.append('size', event.pageSize);
    }
    return this.http.get<IBookPage>(`${environment.apiUrl}/books`, {params: params})
  }

  getById(id: string) {
    return this.http.get<IBookDetails>(`${environment.apiUrl}/books/${id}`);
  }

  getCommentsById(id: string) {
    return this.http.get<IComment[]>(`${environment.apiUrl}/books/${id}/comments`);
  }

  getRecommendedBooks() {
    return this.http.get<IBook[]>(`${environment.apiUrl}/recommended`);
  }

  saveRating(userId: string | undefined, bookId: string, rating: number) {

    return this.http.post(`${environment.apiUrl}/ratings`, {userId: userId, rating: rating, bookId: Number(bookId)})
      .subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })

  }

  saveComment(userId: string | undefined, bookId: string, title: string, comment: string) {

    return this.http.post(`${environment.apiUrl}/comments`, {
      user_id: userId,
      bookId: Number(bookId),
      title: title,
      comment: comment
    })

  }

  getAllLanguages() {
    return this.http.get<ILanguage[]>(`${environment.apiUrl}/languages`);
  }

  getAllCategory() {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }


}
