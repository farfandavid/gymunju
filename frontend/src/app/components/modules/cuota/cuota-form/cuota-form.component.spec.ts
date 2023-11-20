import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaFormComponent } from './cuota-form.component';

describe('CuotaFormComponent', () => {
  let component: CuotaFormComponent;
  let fixture: ComponentFixture<CuotaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
