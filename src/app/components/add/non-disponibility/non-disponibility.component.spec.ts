import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDisponibilityComponent } from './non-disponibility.component';

describe('NonDisponibilityComponent', () => {
  let component: NonDisponibilityComponent;
  let fixture: ComponentFixture<NonDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonDisponibilityComponent]
    });
    fixture = TestBed.createComponent(NonDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
