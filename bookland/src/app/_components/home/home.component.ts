import {Component, OnInit, ViewChild} from '@angular/core';
import {first} from "rxjs/operators";
import {BookfindService} from "../../_services/bookfind.service";
import {User} from "../../_models/user";
import {IBook, ICategory, ILanguage} from "../../_models/book";
import {AccountService} from "../../_services/account.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: number;
  pageSize: number;
  length: number;

  user: User;
  public books: Array<IBook>;

  booksForm: FormGroup;
  allLanguage: Observable<ILanguage[]>;
  allCategory: Observable<ICategory[]>;
  pageEvent: PageEvent;


  constructor(private accountService: AccountService, private bookFindService: BookfindService, private fb: FormBuilder, private _router: Router, private _route: ActivatedRoute) {
    this.user = this.accountService.userValue;

  }

  ngOnInit() {
    this.allLanguage = this.bookFindService.getAllLanguages();
    this.allCategory = this.bookFindService.getAllCategory();

    this.booksForm = this.fb.group({
      title: ['',],
      isbn: ['',],
      categoryId: ['',],
      from: ['',],
      to: ['',],
      languageId: ['',],
    });

    this._route.queryParamMap.subscribe(queryParamMap => {
      console.log("queryparammapchange")

      if (queryParamMap.get('languageId')) {
        let languageId = Number(queryParamMap.get('languageId'))
        this.booksForm.controls['languageId'].setValue(languageId)
      }

      if (queryParamMap.get('categoryId')) {
        let categoryId = Number(queryParamMap.get('categoryId'))
        this.booksForm.controls['categoryId'].setValue(categoryId)
      }

      this.booksForm.controls['isbn'].setValue(queryParamMap.get('isbn'))
      this.booksForm.controls['from'].setValue(queryParamMap.get('from'))
      this.booksForm.controls['to'].setValue(queryParamMap.get('to'))
      this.booksForm.controls['title'].setValue(queryParamMap.get('title'))
      this.pageEvent = new PageEvent();
      this.pageEvent.pageIndex = Number(queryParamMap.get('page'))
      this.pageEvent.pageSize = Number(queryParamMap.get('size') || 20)
    });


    const filtered = {};
    if (this.booksForm.valid) {
      for (let key in this.booksForm.value) {
        if (this.booksForm.value[key]) {
          //filtered[key] = this.booksForm.value[key];
          Object.assign(filtered, {[key]: this.booksForm.value[key]});
        }
      }
    }

    this.bookFindService.getFilteredBooks(filtered, this.pageEvent).pipe(first())
      .subscribe(
      books => {
        this.books = books.books
        this.pageIndex = books.currentPage
        this.length = books.totalItems
      }
    )
  }


  public getServerData(event: PageEvent) {
    const filtered = {};
    if (this.booksForm.valid) {
      for (let key in this.booksForm.value) {
        if (this.booksForm.value[key]) {
          //filtered[key] = this.booksForm.value[key];
          Object.assign(filtered, {[key]: this.booksForm.value[key]});
        }
      }
    }

    this.bookFindService.getFilteredBooks(filtered, event).subscribe(
      response => {
        this.books = response.books
        this.pageIndex = response.currentPage
        this.length = response.totalItems

        this._router.navigate([], {
          relativeTo: this._route,
          queryParams: {
            page: response.currentPage,
            size: event.pageSize
          },
          queryParamsHandling: 'merge',
        });

      },
      error => {
        // handle error
      }
    );
    return event
  }

  onFormSubmit() {
    console.log(this.booksForm.value)

    const filtered = {};
    if (this.booksForm.valid) {
      for (let key in this.booksForm.value) {
        if (this.booksForm.value[key]) {
          //filtered[key] = this.booksForm.value[key];
          Object.assign(filtered, {[key]: this.booksForm.value[key]});
        }
      }
    }
    console.log(filtered)

    /*const truthy = Object.keys(this.booksForm.value).filter(item => this.booksForm.value[item] != undefined || this.booksForm.value[item] != null || this.booksForm.value[item] != '');
    const newObj = {};
    truthy.forEach(item =>Object.assign(newObj, { [item]: this.booksForm.value[item]}));
    console.log(newObj)
    console.log(truthy)*/

    // changes the route without moving from the current view or
    // triggering a navigation event,
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: filtered /*{
        language: this.booksForm.controls['Language'].value
      }*/,
      //queryParamsHandling: 'preserve',
      // preserve the existing query params in the route
      /*skipLocationChange: true*/
      // do not trigger navigation
    });


    // var formData: any = new FormData();
    // formData.append("languageId", this.booksForm.controls['Language'].value);

    this.bookFindService.getFilteredBooks(filtered, this.pageEvent).pipe(first())
      .subscribe(s => {
        this.books = s.books
        this.pageIndex = s.currentPage
        this.length = s.totalItems
      });
  }

  resetForm() {

  }
}
