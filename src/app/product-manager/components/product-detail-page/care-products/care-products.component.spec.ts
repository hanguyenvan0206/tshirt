import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareProductsComponent } from './care-products.component';

describe('CareProductsComponent', () => {
  let component: CareProductsComponent;
  let fixture: ComponentFixture<CareProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
