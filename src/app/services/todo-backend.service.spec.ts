import { TestBed, inject } from '@angular/core/testing';

import { TodoBackendService } from './todo-backend.service';

describe('TodoBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoBackendService]
    });
  });

  it('should be created', inject([TodoBackendService], (service: TodoBackendService) => {
    expect(service).toBeTruthy();
  }));
});
