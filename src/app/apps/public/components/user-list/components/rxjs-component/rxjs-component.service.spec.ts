import { TestBed } from '@angular/core/testing';

import { RxjsComponentService } from './rxjs-component.service';

describe('RxjsComponentService', () => {
  let service: RxjsComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
