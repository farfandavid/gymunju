import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from '../models/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  URL: string = 'http://localhost:3000/api/'

  constructor(private _http: HttpClient) { }

  getRutinas(): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'rutina', option);
  }

  getRutinasDeAlumno(idAlumno: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'rutina/' + 'alumno/' + idAlumno, option);
  }

  getRutina(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "rutina/" + id, option);
  }

  addRutina(rutina: Rutina): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(rutina);
    return this._http.post(this.URL + "rutina", body, option);
  }

  updateRutina(rutina: Rutina): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(rutina);
    return this._http.put(this.URL + "rutina/" + rutina._id, body, option);
  }

  deleteRutina(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.delete(this.URL + "rutina/" + id, option);
  }


}
