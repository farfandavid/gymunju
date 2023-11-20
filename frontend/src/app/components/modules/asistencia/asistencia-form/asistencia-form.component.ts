import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-asistencia-form',
  templateUrl: './asistencia-form.component.html',
  styleUrls: ['./asistencia-form.component.css']
})
export class AsistenciaFormComponent implements OnInit {

  asistencia: Asistencia;
  alumno: Alumno;

  action: string = "new";

  constructor(private asistenciaService: AsistenciaService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == 0) {
          this.action = "new";
          this.iniciarDatos();
          this.cargarAlumno(params.alumno);
          this.asistencia.idAlumno = params.alumno;
        }
        else {
          this.action = "update";
          this.iniciarDatos();
          this.cargarAsistencia(params.id);
          this.cargarAlumno(params.idAlumno);
        }
      }
    )
  }

  iniciarDatos() {
    this.asistencia = new Asistencia();
    this.alumno = new Alumno();
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      (result) => {
        Object.assign(this.alumno, result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarAsistencia(id: string) {
    this.asistenciaService.getAsistencia(id).subscribe(
      (result) => {
        Object.assign(this.asistencia, result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarAsistencia() {
    this.asistenciaService.addAsistencia(this.asistencia).subscribe(
      (result) => {
        if (result.status == "1") {
          this.obtenerUltimaAsistencia();
          this.toastr.success("La asistencia fue registrada correctamente","Asistencia agregada!" );
          // this.router.navigate(["asistencia"]);
        }
      },
      (error) => {
        this.toastr.error("La asistencia no fue agregada correctamente", "Error");
        console.log(error);
      }
    )
  }

  obtenerUltimaAsistencia() {
    this.asistenciaService.getAsistencias().subscribe(
      (result) => {
        let vAsistencia = new Asistencia();
        let lastItem = result[result.length - 1];
        Object.assign(vAsistencia, lastItem);
        this.alumno.asistencias.push(vAsistencia);
        this.modificarAlumno();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  modificarAlumno() {
    this.alumnoService.updateAlumno(this.alumno).subscribe(
      (result) => {
        if (result.status == "1") {
          this.router.navigate(["alumno"]);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  modificarAsistencia() {
    this.asistenciaService.updateAsistencia(this.asistencia).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.info("La asistencia se modificó correctamente", "Asistencia modificada!");
          this.router.navigate(["asistencia/0/alumno/" + this.asistencia.idAlumno]);
        }
      },
      (error) => {
        this.toastr.error("La asistencia no fue modificada", "Error");
        console.log(error);
      }
    )
  }

  volver(){
    this.router.navigate(["alumno"]);
  }

  limpiar(asistenciaform: NgForm){
    asistenciaform.reset();
    this.iniciarDatos();
  }

}
