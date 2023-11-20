import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAsistenciaComponent } from './alumno-asistencia.component';

describe('AlumnoAsistenciaComponent', () => {
  let component: AlumnoAsistenciaComponent;
  let fixture: ComponentFixture<AlumnoAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
