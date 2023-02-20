import { TestBed } from '@angular/core/testing';

import { SecondModalService } from './second-modal.service';

describe('SecondModalService', () => {
  let service: SecondModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
