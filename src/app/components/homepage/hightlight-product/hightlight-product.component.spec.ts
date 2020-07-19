import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HightlightProductComponent } from './hightlight-product.component';

describe('HightlightProductComponent', () => {
  let component: HightlightProductComponent;
  let fixture: ComponentFixture<HightlightProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HightlightProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HightlightProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
