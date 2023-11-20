import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { AlumnoService } from 'src/app/services/alumno.service';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-check-rutina',
  templateUrl: './check-rutina.component.html',
  styleUrls: ['./check-rutina.component.css']
})
export class CheckRutinaComponent implements OnInit {
  alumno: Alumno;
  rutina: Rutina;
  rutinas: Array<Rutina>;
  ejercicios: Array<Ejercicio>;
  a: Array<Boolean>;
  j:number=0;
  constructor(private rutinaService: RutinaService, private toastr: ToastrService,
    private router:Router,private activatedRoute:ActivatedRoute, private alumnoService:AlumnoService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0") {
        this.iniciarDatos();
        this.cargarRutinas();
        this.cargarAlumno(params.alumno);
      }
    }
    )
  }
  iniciarDatos() {
    this.rutinas = new Array<Rutina>();
    this.ejercicios = new Array<Ejercicio>();
    this.rutina = new Rutina();
    this.alumno = new Alumno();
    this.a = new Array<Boolean>();
  }

  cargarRutinas() {
    this.rutinaService.getRutinas().subscribe(
      (result) => {
        this.rutinas.splice(0, this.rutinas.length);
        result.forEach(
          element => {
            let vRutina = new Rutina();
            let vEjercicio = new Ejercicio();
            Object.assign(vRutina, element);
            Object.assign(vEjercicio, vRutina.ejercicios)
            this.rutinas.push(vRutina);
            this.ejercicios.push(vEjercicio);
          }
        )
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
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
    console.log(this.alumno);
  }

  addRutinasSeleccionadas(){
    console.log(this.a);
    for(this.j=0; this.j<=this.a.length;this.j++) {
      console.log(this.a[this.j]);
      if(this.a[this.j]==true){
        let Vrutina:Rutina
        Vrutina=this.rutinas[this.j];
        this.alumno.rutinas.push(this.rutinas[this.j]);
        console.log(Vrutina);
      }
    }
    console.log(this.alumno.rutinas);
    this.modificarAlumno();
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
}
