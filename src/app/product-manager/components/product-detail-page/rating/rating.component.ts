import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public rating: number;
  public itemId1: number;

  @Output() getRating: EventEmitter<any> = new EventEmitter<number>();

  inputName1: string;
  ngOnInit() {
    this.inputName1 = this.itemId1 + '_rating';
  }
  onClick1(rating: number) {
    this.rating = rating;
    this.getRating.emit(this.rating);
  }


}
