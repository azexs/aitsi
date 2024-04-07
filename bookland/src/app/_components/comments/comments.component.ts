import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookfindService} from "../../_services/bookfind.service";
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";
import {IComment} from "../../_models/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments: Observable<IComment[]>;

  public id: string;
  user: User | undefined;

  commentsForm: FormGroup;

  constructor(private idFilme: ActivatedRoute, private bookFindService: BookfindService, private accountService: AccountService, private fb: FormBuilder,) {
    this.id = idFilme.snapshot.params.id;
    this.user = this.accountService.userValue;
  }

  get f() {
    return this.commentsForm.controls;
  }

  ngOnInit(): void {
    this.commentsForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.comments = this.bookFindService.getCommentsById(this.id)

  }

  addNewComment() {
    this.bookFindService.saveComment(this.user?.id, this.id, this.f.title.value, this.f.comment.value).subscribe({
      next: data => {
        console.log(data)
        this.comments = this.bookFindService.getCommentsById(this.id)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

  }
}
