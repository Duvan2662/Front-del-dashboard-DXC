import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mobiles } from './mobiles';

describe('Mobiles', () => {
  let component: Mobiles;
  let fixture: ComponentFixture<Mobiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mobiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mobiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
