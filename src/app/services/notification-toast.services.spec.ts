import { TestBed } from '@angular/core/testing';

import { NotificationToastServices } from './notification-toast.services';

describe('NotificationToastServices', () => {
  let service: NotificationToastServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationToastServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
