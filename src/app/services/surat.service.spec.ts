import { TestBed } from '@angular/core/testing';

import { SuratService } from './surat.service';

describe('SuratService', () => {
  let service: SuratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
