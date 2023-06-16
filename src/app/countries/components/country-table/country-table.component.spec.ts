import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTableComponent } from './country-table.component';

describe('CountryTableComponent', () => {
  let component: CountryTableComponent;
  let fixture: ComponentFixture<CountryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryTableComponent]
    });
    fixture = TestBed.createComponent(CountryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
