import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio';
import { EjercicioService } from 'src/app/services/ejercicio.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {

  ejercicios: Array<Ejercicio>;

  constructor(private ejercicioService: EjercicioService,
    private router: Router, private toastr: ToastrService) {
    this.iniciarDatos();
    this.cargarEjercicios();
  }

  ngOnInit(): void {
  }

  iniciarDatos() {
    this.ejercicios = new Array<Ejercicio>();
  }

  cargarEjercicios() {
    this.ejercicioService.getEjercicios().subscribe(
      (result) => {
        this.ejercicios.splice(0, this.ejercicios.length);
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

  agregarEjercicio() {
    this.router.navigate(["ejercicio-form/", 0]);
  }

  modificarEjercicio(ejercicio: Ejercicio) {
    this.router.navigate(["ejercicio-form/", ejercicio._id]);
  }

  borrarEjercicio(id: string) {
    this.ejercicioService.deleteEjercicio(id).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info("El ejercicio fue eliminado correctamente", "Ejercicio Eliminado");
        this.cargarEjercicios();
      },
      (error) => {
        this.toastr.error("El Ejercicio no fue eliminado correctamente", "Error");
        console.log(error);
      }
    )
  }

}
