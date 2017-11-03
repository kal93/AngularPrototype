import { TestBed, inject } from '@angular/core/testing';

import { GetConfigService } from './get-config.service';

describe('GetConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetConfigService]
    });
  });

  it('should be created', inject([GetConfigService], (service: GetConfigService) => {
    expect(service).toBeTruthy();
  }));
});
