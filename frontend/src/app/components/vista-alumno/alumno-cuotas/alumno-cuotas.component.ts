import { Component, OnInit } from '@angular/core';
import { Cuota } from 'src/app/models/cuota';
import { Usuario } from 'src/app/models/usuario';
import { CuotaService } from 'src/app/services/cuota.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno-cuotas',
  templateUrl: './alumno-cuotas.component.html',
  styleUrls: ['./alumno-cuotas.component.css']
})
export class AlumnoCuotasComponent implements OnInit {

  usuario: Usuario;
  usuarios: Array<Usuario>;
  cuotas: Array<Cuota>;
  id:string;
  band:Boolean=false;

  constructor(public loginService: LoginService,
    private cuotaService:CuotaService,
    private usuarioService:UsuarioService) {
      this.iniciarDatos();
    }

  ngOnInit(): void {
  }

  async iniciarDatos(){
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.cuotas = new Array<Cuota>();  
    await this.cargarUsuarioAlumno();
    
  }

  cargarUsuarioAlumno() {
    this.id = this.loginService.idLogged(); 
    this.usuarioService.getUsuario(this.id).subscribe(
      (result) => {
        Object.assign(this.usuario, result);
        console.log(this.usuario);
        this.band=true;
        if(this.usuario.alumno.cuotas.length!=0){
        this.cargarCuotas();}
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async cargarCuotas(){
    for(let i=0;i<this.usuario.alumno.cuotas.length;i++){
      this.cuotaService.getCuota(this.usuario.alumno.cuotas[i].toString()).subscribe(
        (result) => {
          let vCuota = new Cuota()
          Object.assign(vCuota, result);
          this.cuotas.push(vCuota);
        },
        (error) => {
          console.log(error);
        }
      ) 
    };
  }
}
