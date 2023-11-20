import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Cuota } from 'src/app/models/cuota';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { CuotaService } from 'src/app/services/cuota.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  cuotas: Array<Cuota>;
  alumnos: Array<Alumno>;
  asistencias: Array<Asistencia>

  constructor(private cuotaService: CuotaService,
    private alumnoService: AlumnoService,
    private asistenciaService: AsistenciaService) {
    this.iniciarDatos();
    this.cargarCuotas();
    this.cargarAlumnos();
    this.cargarAsistencias();
  }

  ngOnInit(): void {
  }

  iniciarDatos() {
    this.cuotas = new Array<Cuota>();
    this.alumnos = new Array<Alumno>();
    this.asistencias = new Array<Asistencia>();
  }

  cargarCuotas() {
    this.cuotaService.getCuotas().subscribe(
      (result) => {
        this.cuotas.splice(0, this.cuotas.length);
        result.forEach(
          element => {
            let vCuota = new Cuota();
            Object.assign(vCuota, element);
            this.cuotas.push(vCuota);
          }
        )
        if (this.cuotas.length > 5) {
          this.cuotas = this.cuotas.slice(Math.max(this.cuotas.length - 5, 1));
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (result) => {
        this.alumnos.splice(0, this.alumnos.length);
        result.forEach(
          element => {
            let vAlumno = new Alumno();
            Object.assign(vAlumno, element);
            this.alumnos.push(vAlumno);
          }
        )
        if (this.alumnos.length > 5) {
          this.alumnos = this.alumnos.slice(Math.max(this.alumnos.length - 5, 1));
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarAsistencias() {
    this.asistenciaService.getAsistencias().subscribe(
      (result) => {
        this.asistencias.splice(0, this.asistencias.length);
        result.forEach(
          element => {
            let vAsistencia = new Asistencia();
            Object.assign(vAsistencia, element);
            this.asistencias.push(vAsistencia);
          }
        )
        if (this.asistencias.length > 5) {
          this.asistencias = this.asistencias.slice(Math.max(this.asistencias.length - 5, 1));
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
