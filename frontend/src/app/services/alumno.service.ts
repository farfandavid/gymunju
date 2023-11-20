import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Flatted from 'flatted';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Cuota } from '../models/cuota';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  URL: string = "http://localhost:3000/api/"

  constructor(private _http: HttpClient) { }

  getAlumnos(): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "alumno", option);
  }

  getAlumno(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "alumno/" + id, option);
  }

  addAlumno(alumno: Alumno): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(alumno);
    return this._http.post(this.URL + "alumno", body, option);
  }

  updateAlumno(alumno: Alumno): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(alumno);
    return this._http.put(this.URL + "alumno/" + alumno._id, body, option);
  }

  deleteAlumno(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this._http.delete(this.URL + "alumno/" + id, option);
  }

  buscarAlumnoDni(search:string):Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "alumno/" + "search/"+search, option);
  }

  pagarCuota(id:string,cuota:Cuota):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(cuota);

    return this._http.post(this.URL+"alumno/"+id+"/cuota", body, option);
  }
}
