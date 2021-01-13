import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuratComponent } from './create-surat.component';

describe('CreateSuratComponent', () => {
  let component: CreateSuratComponent;
  let fixture: ComponentFixture<CreateSuratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
