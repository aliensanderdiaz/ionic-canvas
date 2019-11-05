import { TestBed } from '@angular/core/testing';

import { DatecsPrinterService } from './datecs-printer.service';

describe('DatecsPrinterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatecsPrinterService = TestBed.get(DatecsPrinterService);
    expect(service).toBeTruthy();
  });
});
