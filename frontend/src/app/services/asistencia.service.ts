import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  URL: string = 'http://192.168.100.10:3000/api/'

  constructor(private _http: HttpClient) { }

  getAsistencias(): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'asistencia', option);
  }

  getAsistenciasDeAlumno(idAlumno: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'asistencia/' + 'alumno/' + idAlumno, option);
  }

  getAsistencia(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "asistencia/" + id, option);
  }

  addAsistencia(asistencia: Asistencia): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(asistencia);
    return this._http.post(this.URL + "asistencia", body, option);
  }

  updateAsistencia(asistencia: Asistencia): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(asistencia);
    return this._http.put(this.URL + "asistencia/" + asistencia._id, body, option);
  }

  deleteAsistencia(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this._http.delete(this.URL + "asistencia/" + id, option);
  }
}
