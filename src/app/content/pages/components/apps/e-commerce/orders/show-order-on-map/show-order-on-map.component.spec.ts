import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderOnMapComponent } from './show-order-on-map.component';

describe('ShowOrderOnMapComponent', () => {
  let component: ShowOrderOnMapComponent;
  let fixture: ComponentFixture<ShowOrderOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
