import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  asistencias: Array<Asistencia>;
  datos:Boolean=true;
  constructor(private asistenciaService: AsistenciaService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == 0) {
          // this.action = "new";
          this.iniciarDatos();
          this.cargarAsistenciasDeAlumno(params.idAlumno);
        }
        else {
          // this.action = "update";
          this.iniciarDatos();
          this.cargarAsistencias();
        }
      }
    )
  }

  iniciarDatos() {
    this.asistencias = new Array<Asistencia>();
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
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarAsistenciasDeAlumno(idAlumno: string) {
    this.asistenciaService.getAsistenciasDeAlumno(idAlumno).subscribe(
      (result) => {
        this.asistencias.splice(0, this.asistencias.length);
        result.forEach(
          element => {
            let vCuota = new Asistencia();
            Object.assign(vCuota, element);
            this.asistencias.push(vCuota);
          }
        )
        if(this.asistencias.length==0){this.datos=false;}
      },
      (error) => {
        console.log(error);
      }
    )
  }

  modificarAsistencia(asistencia: Asistencia) {
    this.router.navigate(["asistencia-form/" + "asistencia/" + asistencia._id + "/alumno/" + asistencia.idAlumno]);
  }

  borrarAsistencia(id: string) {
    this.asistenciaService.deleteAsistencia(id).subscribe(
      (result) => {
        console.log(result);
        this.toastr.info( "La asistencia fue eliminada correctamente", "Asistencia Eliminada");
        this.cargarAsistencias();
      },
      (error) => {
        this.toastr.error("La asistencia no fue eliminada correctamente", "Error");
        console.log(error);
      }
    )
  }

}
