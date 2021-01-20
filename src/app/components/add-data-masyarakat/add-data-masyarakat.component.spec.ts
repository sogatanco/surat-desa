import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataMasyarakatComponent } from './add-data-masyarakat.component';

describe('AddDataMasyarakatComponent', () => {
  let component: AddDataMasyarakatComponent;
  let fixture: ComponentFixture<AddDataMasyarakatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataMasyarakatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataMasyarakatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
