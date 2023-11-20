import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCuotasComponent } from './alumno-cuotas.component';

describe('AlumnoCuotasComponent', () => {
  let component: AlumnoCuotasComponent;
  let fixture: ComponentFixture<AlumnoCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
