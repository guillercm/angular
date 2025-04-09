import { TestBed } from '@angular/core/testing';

import { GrcmComponentsService } from './grcm-components.service';

describe('GrcmComponentsService', () => {
  let service: GrcmComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrcmComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
