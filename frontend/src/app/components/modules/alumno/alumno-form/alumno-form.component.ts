import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  alumno: Alumno;
  alumnos: Array<Alumno>;

  action: string = "new";

  constructor(private alumnoService: AlumnoService,
    private router: Router, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0") {
          this.action = "new";
          this.iniciarAlumno();
        }
        else {
          this.action = "update";
          this.iniciarAlumno();
          this.cargarAlumno(params.id);
        }
      }
    )
  }

  iniciarAlumno() {
    this.alumno = new Alumno();
  }

  agregarAlumno() {
    this.alumnoService.addAlumno(this.alumno).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.success("El alumno se agregó correctamente", "Alumno agregado!");
          this.router.navigate(["alumno"]);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("El alumno no fue agregado correctamente","Error");
      }
    )
  }

  modificarAlumno() {
    this.alumnoService.updateAlumno(this.alumno).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.info( "El alumno se modificó correctamente","Alumno modificado!");
          this.router.navigate(["alumno"]);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error( "El alumno no se fue modificado","Error");
      }
    )
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      (result) => {
        Object.assign(this.alumno, result);
        console.log(this.alumno);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  volver(){
    this.router.navigate(["alumno"]);
  }

  limpiar(alumnoform: NgForm){
    alumnoform.reset();
    this.alumno = new Alumno();
  }
}
