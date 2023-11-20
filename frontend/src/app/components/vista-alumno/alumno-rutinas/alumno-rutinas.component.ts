import { Component, OnInit } from '@angular/core';
import { Rutina } from 'src/app/models/rutina';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { RutinaService } from 'src/app/services/rutina.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno-rutinas',
  templateUrl: './alumno-rutinas.component.html',
  styleUrls: ['./alumno-rutinas.component.css']
})
export class AlumnoRutinasComponent implements OnInit {
  usuario: Usuario;
  usuarios: Array<Usuario>;
  rutinas: Array<Rutina>;
  id:string;
  band:Boolean=false;
    
  constructor(public loginService: LoginService,
    private rutinaService:RutinaService,
    private usuarioService:UsuarioService) {
      this.iniciarDatos();
    }

  ngOnInit(): void {
  }

  async iniciarDatos(){
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.rutinas = new Array<Rutina>();  
    this.cargarUsuarioAlumno();
    
  }

  cargarUsuarioAlumno() {
    this.id = this.loginService.idLogged(); 
    this.usuarioService.getUsuario(this.id).subscribe(
      (result) => {
        Object.assign(this.usuario, result);
        console.log(this.usuario);
        this.band=true;
        if(this.usuario.alumno.rutinas.length!=0){
        this.cargarRutinas();}
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async cargarRutinas(){
    for(let i=0;i<this.usuario.alumno.rutinas.length;i++){
      this.rutinaService.getRutina(this.usuario.alumno.rutinas[i].toString()).subscribe(
        (result) => {
          let vRutina = new Rutina()
          Object.assign(vRutina, result);
          this.rutinas.push(vRutina);
        },
        (error) => {
          console.log(error);
        }
      ) 
    };
  }
  }
  
