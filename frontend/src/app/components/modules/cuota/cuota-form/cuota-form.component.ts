import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';
import * as printJS from 'print-js'
import { HttpHandler, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno';
import * as numerosJs from 'src/assets/js/numeros.js';
import { NgForm } from '@angular/forms';
//var numerosJs = require('/src/assets/js/numeros.js')

@Component({
  selector: 'cuota-form',
  templateUrl: './cuota-form.component.html',
  styleUrls: ['./cuota-form.component.css']
})
export class CuotaFormComponent implements OnInit {

  // alumnoId: string;

  cuota: Cuota;
  alumno: Alumno;

  action: string = "new";

  constructor(private cuotaService: CuotaService,
    private router: Router, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == 0) {
          this.action = "new";
          this.iniciarDatos();
          this.cargarAlumno(params.alumno);
          this.cuota.idAlumno = params.alumno;
        }
        else {
          this.action = "update";
          this.iniciarDatos();
          this.cargarCuota(params.id);
          this.cargarAlumno(params.idAlumno);
        }
      }
    )
  }

  iniciarDatos() {
    this.cuota = new Cuota();
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

  cargarCuota(id: string) {
    this.cuotaService.getCuota(id).subscribe(
      (result) => {
        Object.assign(this.cuota, result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarCuota() {
    this.cuotaService.addCuota(this.cuota).subscribe(
      (result) => {
        if (result.status == "1") {
          this.obtenerUltimaCuota();
          this.toastr.success("La cuota fue registrada correctamente", "Cuota agregada!");
          // this.router.navigate(["cuota"]);
        }
      },
      (error) => {
        this.toastr.error("La cuota no fue agregada correctamente", "Error");
        console.log(error);
      }
    )
  }

  obtenerUltimaCuota() {
    this.cuotaService.getCuotas().subscribe(
      (result) => {
        let vCuota = new Cuota();
        let lastItem = result[result.length - 1];
        Object.assign(vCuota, lastItem);
        this.alumno.cuotas.push(vCuota);
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
          console.log(result);
          this.router.navigate(["alumno"]);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  modificarCuota() {
    this.cuotaService.updateCuota(this.cuota).subscribe(
      (result) => {
        if (result.status == "1") {
          this.toastr.info("La cuota se modificó correctamente", "Cuota modificada!");
          this.router.navigate(["cuota/0/alumno/" + this.cuota.idAlumno]);
        }
      },
      (error) => {
        this.toastr.error("La cuota no fue modificada", "Error");
        console.log(error);
      }
    )
  }

  volver(){
    this.router.navigate(["alumno"]);
  }

  limpiar(cuotaform: NgForm){
    cuotaform.reset();
    this.iniciarDatos();
  }

  generarComprobante() {
    printJS({ printable: 'printJS-form', type: 'html', targetStyles: ['*'] })
  }

  
}
