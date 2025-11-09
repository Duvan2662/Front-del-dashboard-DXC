import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePage } from './mobile-page';

describe('MobilePage', () => {
  let component: MobilePage;
  let fixture: ComponentFixture<MobilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
