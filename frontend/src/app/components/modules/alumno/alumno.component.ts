import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno';
import { Cuota } from 'src/app/models/cuota';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { error } from 'console';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumnos: Array<Alumno>;
  users: Array<Usuario>;
  filterAlumno = '';

  constructor(private alumnoService: AlumnoService, private loginService:LoginService,
    private router: Router, private toastr: ToastrService, private usuarioService:UsuarioService) {
    this.iniciarDatos();
    this.cargarAlumnos();
  }

  ngOnInit(): void {
  }

  iniciarDatos() {
    this.alumnos = new Array<Alumno>();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (result) => {
        this.alumnos.splice(0, this.alumnos.length);
        result.forEach(
          element => {
            let vAlumno = new Alumno();
            Object.assign(vAlumno, element);
            this.alumnos.push(vAlumno);
          }
        )
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarAlumno() {
    this.router.navigate(["alumno-form/", 0]);
  }

  modificarAlumno(alumno: Alumno) {
    this.router.navigate(["alumno-form/", alumno._id]);
  }

  borrarAlumno(id: string) {
    this.alumnoService.deleteAlumno(id).subscribe(
      (result) => {
        console.log(result);
        this.cargarAlumnos();
        this.toastr.info( 'Alumno se eliminó correctamente','Alumno eliminado!');
      },
      (error) => {
        console.log(error);
        this.toastr.error( "El alumno no fue eliminado","Error");
      }
    )
  }

  eliminarUsuarioAlumno(id: string){
    this.usuarioService.getUsuarioPorIdAlumno(id).subscribe(
      (result) => {
        if(result.length!=0){
          result.forEach(
          element => {
          console.log(result);
            let vUsuario = new Usuario();
            Object.assign(vUsuario, element);
            this.users= new Array<Usuario>();
            this.users.push(vUsuario);
          },
          )
          this.usuarioService.deleteUsuario(this.users[0]._id ).subscribe(
            (result) =>{
              console.log(result);
              this.borrarAlumno(id);
            },
            (error) => {
              console.log(error);
            }
          )
        }else{this.borrarAlumno(id);}
      },
      (error) => {
        console.log(error);
      }
    )
  }


  verCuotas(idAlumno: string) {
    this.router.navigate(["cuota/" + 0 + "/alumno/", idAlumno]);
  }

  agregarCuota(idAlumno: string) {
    this.router.navigate(["cuota-form/0/", idAlumno]);
  }

  verAsistencias(idAlumno: string) {
    this.router.navigate(["asistencia/" + 0 + "/alumno/", idAlumno]);
  }

  agregarAsistencia(idAlumno: string) {
    this.router.navigate(["asistencia-form/0/", idAlumno]);
  }

  verRutinas(idAlumno: string) {
    this.router.navigate(["rutina/" + 0 + "/alumno/", idAlumno]);
  }

  agregarRutina(idAlumno: string) {
    this.router.navigate(["rutina-form/0/", idAlumno]);
  }

}
