import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMobilePage } from './new-mobile-page';

describe('NewMobilePage', () => {
  let component: NewMobilePage;
  let fixture: ComponentFixture<NewMobilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMobilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
