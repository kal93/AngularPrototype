import { TestBed, inject } from '@angular/core/testing';

import { PatientListService } from './patient-list.service';

describe('PatientListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientListService]
    });
  });

  it('should be created', inject([PatientListService], (service: PatientListService) => {
    expect(service).toBeTruthy();
  }));
});
