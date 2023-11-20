import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  alumno: Alumno;
  alumnos: Array<Alumno>;
  dni: string;
  returnUrl: string;
  msgdni: string;
  msgusr: string;
  alumnocorrecto: Boolean = false;
  usrcorrecto: Boolean = false;
  
  constructor(private usuarioService: UsuarioService, private toastr: ToastrService,
    private alumnoService: AlumnoService, private loginService: LoginService,
    private router: Router, private route: ActivatedRoute) {
    this.iniciarDatos();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ingreso';
  }

  iniciarDatos() {
    this.usuario = new Usuario;
    this.alumno = new Alumno;
    this.alumnos = new Array<Alumno>();
  }

  cargarAlumno() {
    console.log(this.dni);
    this.alumnoService.buscarAlumnoDni(this.dni).subscribe(
      result => {
        result.forEach(
          element => {
            let vAlumno = new Alumno();
            Object.assign(vAlumno, element);
            this.alumnos.push(vAlumno);
          })
        this.alumno = this.alumnos[0];
        console.log(this.alumno);
        this.verificarAlumno();
      },
      error => {
        console.log(error);
        alert("Error en busqueda de Alumno");
      }
    )
  }

  verificarAlumno() {
    if (this.alumnos.length == 0) {
      this.msgdni = "El DNI ingresado no pertenece a un alumno";
      this.iniciarDatos();
    }
    else {
      this.usuarioService.getUsuarioPorIdAlumno(this.alumno._id).subscribe(
        result => {
          console.log(result.length);
          if (result.length != 0) {
            this.msgdni = "Este alumno ya tiene una cuenta registrada";
            this.iniciarDatos();
            console.log(this.msgusr);
          } else { this.alumnocorrecto = true; }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  guardarUsuario() {
    this.usuario.tipo = 1;
    this.usuario.alumno = this.alumno;
    console.log(this.usuario);
    this.usuarioService.addUsuario(this.usuario).subscribe(
      result => {
        if (result.status == "1") {
          this.toastr.success("El Usuario fue registrado correctamente", "Usuario agregado!");
        }
        console.log(result);
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.toastr.error("El Usuario no fue agregado correctamente", "Error");
        console.log(error);
      }
    );
  }

  verificarUsername() {
    this.usuarioService.getUsuarioPorUsername(this.usuario.username).subscribe(
      result => {
        console.log(result);
        if (result.length != 0) {
          this.msgusr = "El username ya está elegido por favor eliga uno nuevo";
          console.log(this.msgusr);
          this.usuario = new Usuario;
        } else {
          this.guardarUsuario();
        }
      },
      error => {
        console.log(error);
      }
    );
  }


}
