import { TestBed } from '@angular/core/testing';

import { TreemapsService } from './treemaps.service';

describe('TreemapsService', () => {
  let service: TreemapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreemapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
