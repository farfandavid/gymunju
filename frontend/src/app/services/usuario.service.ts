import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) {

  }

  addUsuario(usuario: Usuario):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.urlbase+"usuario", body, option);
  }

  getUsuario(id: string):Observable<any>{
    let options = {
    headers: new HttpHeaders({
      
    }),
    params: new HttpParams({

    })
    };
    return this.http.get(this.urlbase +"usuario/"+ id, options);
  }
  getUsuarioPorUsername(search:string):Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this.http.get(this.urlbase+ "usuario/" + "search/"+search, option);
  }

  getUsuarioPorIdAlumno(search:string):Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this.http.get(this.urlbase+ "usuario/" + "search/usr/"+search, option);
  }

  deleteUsuario(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this.http.delete(this.urlbase + "usuario/" + id, option);
  }
}
