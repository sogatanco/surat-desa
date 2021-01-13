import { TestBed } from '@angular/core/testing';

import { MasyarakatService } from './masyarakat.service';

describe('MasyarakatService', () => {
  let service: MasyarakatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasyarakatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
