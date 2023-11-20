import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { AlumnoService } from 'src/app/services/alumno.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'rutina-form',
  templateUrl: './rutina-form.component.html',
  styleUrls: ['./rutina-form.component.css']
})
export class RutinaFormComponent implements OnInit {

  rutina: Rutina;
  // ejercicio: Ejercicio;
  ejercicios: Array<Ejercicio>;
  alumno: Alumno;

  action: string = "new";

  cbo: Array<Boolean>;
  j: number = 0;

  tope:Boolean=true;

  constructor(private rutinaService: RutinaService,
    private ejercicioService: EjercicioService,
    private router: Router, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0") {
          this.action = "new";
          this.iniciarDatos();
          this.cargarAlumno(params.alumno);
          this.cargarEjercicios();
          this.rutina.idAlumno = params.alumno;
          
        }
        else {
          this.action = "update";
          this.iniciarDatos();
          this.cargarAlumno(params.idAlumno);
          this.cargarEjercicios();
          this.cargarRutina(params.id);
        }
      }
    )
  }

  iniciarDatos() {
    this.rutina = new Rutina();
    // this.ejercicio = new Ejercicio();
    this.ejercicios = new Array<Ejercicio>();
    this.cbo = new Array<Boolean>();
    this.alumno = new Alumno();
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      (result) => {
        Object.assign(this.alumno, result);
        if(this.action == "new")
       {this.controlarCantidadRutina();}
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarEjercicios() {
    this.ejercicioService.getEjercicios().subscribe(
      (result) => {
        result.forEach(
          element => {
            let vEjercicio = new Ejercicio();
            Object.assign(vEjercicio, element);
            this.ejercicios.push(vEjercicio);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarRutina() {
    this.seleccionarEjercicios();
    this.rutinaService.addRutina(this.rutina).subscribe(
      (result) => {
        if (result.status == "1") {
          this.obtenerUltimaRutina();
          this.toastr.success("La rutina se agregó correctamente", "Rutina agregada!");
          // this.router.navigate(["rutina"]);
        }
      },
      (error) => {
        this.toastr.error("La rutina no fue agregada correctamente", "Error");
        console.log(error);
      }
    )
  }

  obtenerUltimaRutina() {
    this.rutinaService.getRutinas().subscribe(
      (result) => {
        let vRutina = new Rutina();
        let lastItem = result[result.length - 1];
        Object.assign(vRutina, lastItem);
        this.alumno.rutinas.push(vRutina);
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

  seleccionarEjercicios() {
    let vEjercicios = new Array<Ejercicio>();
    for (this.j = 0; this.j <= this.cbo.length; this.j++) {
      if (this.cbo[this.j] == true) {
        vEjercicios.push(this.ejercicios[this.j]);
        this.rutina.ejercicios = vEjercicios;
      }
    }
  }

  modificarEjercicio(ejercicio: Ejercicio) {
    this.ejercicioService.updateEjercicio(ejercicio).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // 

  modificarRutina() {
    this.seleccionarEjercicios();
    this.rutinaService.updateRutina(this.rutina).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.info("La rutina se modificó correctamente", "Rutina Modificada");
          this.router.navigate(["rutina"]);
        }
      },
      (error) => {
        this.toastr.error("La rutina fue modificada correctamente", "Error");
        console.log(error);
      }
    )
  }

  cargarRutina(id: string) {
    this.rutinaService.getRutina(id).subscribe(
      (result) => {
        Object.assign(this.rutina, result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  controlarCantidadRutina(){
    console.log(this.alumno.plan);
    console.log(this.alumno.rutinas.length);

    if(this.alumno.plan='Basico')
    {
      if(this.alumno.rutinas.length >= 3)
      {this.tope=false;}
    }
    else
    {
      if(this.alumno.plan='Full')
      {
        if(this.alumno.rutinas.length >= 5)
        {this.tope=false;}
      }else
      {
        if(this.alumno.rutinas.length >= 7)
        {this.tope=false;}
      }
    }
  }
  
  volver(){
    this.router.navigate(["alumno"]);
  }

  limpiar(rutinaform: NgForm){
    rutinaform.reset();
    this.iniciarDatos();
  }

}
