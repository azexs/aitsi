import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";
import {BookfindService} from "../../_services/bookfind.service";
import {IBook} from "../../_models/book";
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public id: string;
  public filme: IBook;
  public rate: number;
  public allRate: number | null;
  user: User | undefined;


  constructor(private idFilme : ActivatedRoute,private bookFindService: BookfindService,private accountService: AccountService) {
    this.id = idFilme.snapshot.params.id;
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.bookFindService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.filme = x.book;
        console.log(x.book);
        this.rate = x.userRating || 0;
        this.allRate = x.allRating
      })
  }

  saveRating(rate: number) {
    this.bookFindService.saveRating(this.user?.id,this.id,rate)
    console.log(rate);
    console.log(this.id);
    console.log(this.user?.id);
  }
}
