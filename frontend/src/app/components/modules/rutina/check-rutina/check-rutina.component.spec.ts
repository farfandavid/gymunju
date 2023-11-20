import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRutinaComponent } from './check-rutina.component';

describe('CheckRutinaComponent', () => {
  let component: CheckRutinaComponent;
  let fixture: ComponentFixture<CheckRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRutinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
