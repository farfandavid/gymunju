import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import { Usuario } from 'src/app/models/usuario';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-alumno-asistencia',
  templateUrl: './alumno-asistencia.component.html',
  styleUrls: ['./alumno-asistencia.component.css']
})
export class AlumnoAsistenciaComponent implements OnInit {

  usuario: Usuario;
  usuarios: Array<Usuario>;
  asistencias: Array<Asistencia>;
  id: string;
  band: Boolean = false;

  constructor(public loginService: LoginService,
    private asistenciaService: AsistenciaService,
    private usuarioService: UsuarioService) {
    this.iniciarDatos();
  }

  ngOnInit(): void {
  }

  async iniciarDatos() {
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.asistencias = new Array<Asistencia>();
    await this.cargarUsuarioAlumno();

  }

  cargarUsuarioAlumno() {
    this.id = this.loginService.idLogged();
    this.usuarioService.getUsuario(this.id).subscribe(
      (result) => {
        Object.assign(this.usuario, result);
        console.log(this.usuario);
        this.band = true;
        if (this.usuario.alumno.asistencias.length != 0) {
          this.cargarAsistencias();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async cargarAsistencias() {
    for (let i = 0; i < this.usuario.alumno.asistencias.length; i++) {
      this.asistenciaService.getAsistencia(this.usuario.alumno.asistencias[i].toString()).subscribe(
        (result) => {
          let vAsistencia = new Asistencia()
          Object.assign(vAsistencia, result);
          this.asistencias.push(vAsistencia);
        },
        (error) => {
          console.log(error);
        }
      )
    };
  }
}

