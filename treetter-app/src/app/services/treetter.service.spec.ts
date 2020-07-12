import { TestBed } from '@angular/core/testing';

import { TreetterService } from './treetter.service';

describe('TreetterService', () => {
  let service: TreetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
