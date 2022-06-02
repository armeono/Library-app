import { TestBed } from '@angular/core/testing';

import { BookapiService } from './bookapi.service';

describe('BookapiService', () => {
  let service: BookapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
