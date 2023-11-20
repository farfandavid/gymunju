import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio';
import { EjercicioService } from 'src/app/services/ejercicio.service';

@Component({
  selector: 'ejercicio-form',
  templateUrl: './ejercicio-form.component.html',
  styleUrls: ['./ejercicio-form.component.css']
})
export class EjercicioFormComponent implements OnInit {

  ejercicio: Ejercicio;
  ejercicios: Array<Ejercicio>;

  action: string = "new";

  constructor(private ejercicioService: EjercicioService,
              private router: Router, private toastr : ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0") {
          this.action = "new";
          this.iniciarEjercicio();
        }
        else {
          this.action = "update";
          this.iniciarEjercicio();
          this.cargarEjercicio(params.id);
        }
      }
    )
  }

  iniciarEjercicio() {
    this.ejercicio = new Ejercicio();
  }

  agregarEjercicio() {
    this.ejercicioService.addEjercicio(this.ejercicio).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.success("El ejercicio se agregó correctamente","Ejercicio agregado!");
          this.router.navigate(["ejercicio"]);
        }
      },
      (error) => {
        this.toastr.error("El Ejercicio no fue agregado correctamente", "Error");
        console.log(error);
      }
    )
  }

  modificarEjercicio() {
    this.ejercicioService.updateEjercicio(this.ejercicio).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.info("El ejercicio se modificó correctamente","Ejercicio Modificado");
          this.router.navigate(["ejercicio"]);
        }
      },
      (error) => {
        this.toastr.error("El Ejercicio no se modificó correctamente", "Error");
        console.log(error);
      }
    )
  }

  cargarEjercicio(id: string) {
    this.ejercicioService.getEjercicio(id).subscribe(
      (result) => {
        Object.assign(this.ejercicio, result);
        console.log(this.ejercicio);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  volver(){
    this.router.navigate(["ejercicio"]);
  }

  limpiar(ejercicioform: NgForm){
    ejercicioform.reset();
    this.ejercicio = new Ejercicio();
  }
}
