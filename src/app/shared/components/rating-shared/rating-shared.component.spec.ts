import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSharedComponent } from './rating-shared.component';

describe('RatingSharedComponent', () => {
  let component: RatingSharedComponent;
  let fixture: ComponentFixture<RatingSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
