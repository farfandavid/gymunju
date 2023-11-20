import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';
import * as printJS from 'print-js'
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno';

@Component({
  selector: 'app-cuota',
  templateUrl: './cuota.component.html',
  styleUrls: ['./cuota.component.css']
})
export class CuotaComponent implements OnInit {

  cuotas: Array<Cuota>;
  alumno:Alumno;
  cuota:Cuota;
  datos:Boolean=true;
  constructor(private cuotaService: CuotaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == 0) {
          // this.action = "new";
          this.iniciarDatos();
          this.cargarCuotasDeAlumno(params.idAlumno);
        }
        else {
          // this.action = "update";
          this.iniciarDatos();
          this.cargarCuotas();
        }
      }
    )
  }

  iniciarDatos() {
    this.alumno = new Alumno();
    this.cuota = new Cuota();
    this.cuotas = new Array<Cuota>();
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
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarCuotasDeAlumno(idAlumno: string) {
    this.cuotaService.getCuotasDeAlumno(idAlumno).subscribe(
      (result) => {
        this.cuotas.splice(0, this.cuotas.length);
        result.forEach(
          element => {
            let vCuota = new Cuota();
            Object.assign(vCuota, element);
            this.cuotas.push(vCuota);
          }
        )
        if(this.cuotas.length==0){this.datos=false;}
      },
      (error) => {
        console.log(error);
      }
    )
  }

  modificarCuota(cuota: Cuota) {
    this.router.navigate(["cuota-form/" + "cuota/" + cuota._id + "/alumno/" + cuota.idAlumno]);
  }

  borrarCuota(id: string) {
    this.cuotaService.deleteCuota(id).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info("la cuota fue eliminada correctamente", "Cuota Eliminada");
        this.cargarCuotas();
      },
      (error) => {
        this.toastr.error("La cuota no fue eliminada correctamente", "Error");
        console.log(error);
      }
    )
  }


async imprimirComprobante(cuota:Cuota){
  this.cuota.monto = cuota.monto;
  this.cuota.fechaPago = cuota.fechaPago;
  this.cuota.modoPago = cuota.modoPago;
  this.alumnoService.getAlumno(cuota.idAlumno).subscribe(
    (result) => {
      document.getElementById('nombreApellido').textContent = result["apellido"]+ ", "+ result['nombres'] //this.alumno.apellido + "," + this.alumno.nombres;
      printJS( { printable: 'printJS-form', type: 'html',targetStyles: ['*'] , ignoreElements: ['ignorar']})
    },
    (error) => {
      console.log(error);
    }
  )
  }
}

