import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})
export class RutinaComponent implements OnInit {

  rutinas: Array<Rutina>;
  ejercicios: Array<Ejercicio>;
  datos:Boolean=true;
  
  constructor(private rutinaService: RutinaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == 0) {
          // this.action = "new";
          this.iniciarDatos();
          this.cargarRutinasDeAlumno(params.idAlumno);
        }
        else {
          // this.action = "update";
          this.iniciarDatos();
          this.cargarRutinas();
        }
      }
    )
  }

  iniciarDatos() {
    this.rutinas = new Array<Rutina>();
    this.ejercicios = new Array<Ejercicio>();
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

  cargarRutinasDeAlumno(idAlumno: string) {
    this.rutinaService.getRutinasDeAlumno(idAlumno).subscribe(
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
        if(this.rutinas.length==0){this.datos=false;}
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // agregarRutina() {
  //   this.router.navigate(["rutina-form/", 0]);
  // }

  modificarRutina(rutina: Rutina) {
    this.router.navigate(["rutina-form/" + "rutina/" + rutina._id + "/alumno/" + rutina.idAlumno]);
  }

  borrarRutina(id: string) {
    this.rutinaService.deleteRutina(id).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info("La rutina fue eliminada correctamente", "Rutina Eliminada");
        this.cargarRutinas();
      },
      (error) => {
        console.log(error);
        this.toastr.error("La rutina no fue eliminada correctamente", "Error");
      }
    )
  }

}
