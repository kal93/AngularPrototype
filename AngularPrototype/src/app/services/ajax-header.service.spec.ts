import { TestBed, inject } from '@angular/core/testing';

import { AjaxHeaderService } from './ajax-header.service';

describe('AjaxHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxHeaderService]
    });
  });

  it('should be created', inject([AjaxHeaderService], (service: AjaxHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
