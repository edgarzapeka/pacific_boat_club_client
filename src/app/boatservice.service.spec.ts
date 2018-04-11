import { TestBed, inject } from '@angular/core/testing';

import { BoatserviceService } from './boatservice.service';

describe('BoatserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoatserviceService]
    });
  });

  it('should be created', inject([BoatserviceService], (service: BoatserviceService) => {
    expect(service).toBeTruthy();
  }));
});
