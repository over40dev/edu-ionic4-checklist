import { TestBed } from '@angular/core/testing';

import { ChecklistitemDataService } from '../checklist/checklistitem-data.service';

describe('ChecklistitemDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistitemDataService = TestBed.get(ChecklistitemDataService);
    expect(service).toBeTruthy();
  });
});
