import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor() { }

  @Input() filme: any;
  @Input() isRec: boolean;

  ngOnInit(): void {
  }

}
