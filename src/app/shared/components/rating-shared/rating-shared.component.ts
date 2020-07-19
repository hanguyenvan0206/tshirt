import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-shared',
  templateUrl: './rating-shared.component.html',
  styleUrls: ['./rating-shared.component.scss']
})
export class RatingSharedComponent implements OnInit {
  @Input('star') star: number;
  public rating: number;
  public itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.rating = this.star;
    this.inputName = this.itemId + '_rating';
  }
  //onClick(rating: number): void {
   // this.rating = rating;
   // console.log(this.rating);
  //  this.ratingClick.emit({
 //     rating: rating
  //  });
 // }

}
