import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  URL: string = 'http://localhost:3000/api/'

  constructor(private _http: HttpClient) { }

  getCuotas(): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'cuota', option);
  }

  getCuotasDeAlumno(idAlumno: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'cuota/' + 'alumno/' + idAlumno, option);
  }

  getCuota(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "cuota/" + id, option);
  }

  addCuota(cuota: Cuota): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(cuota);
    return this._http.post(this.URL + "cuota", body, option);
  }

  updateCuota(cuota: Cuota): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(cuota);
    return this._http.put(this.URL + "cuota/" + cuota._id, body, option);
  }

  deleteCuota(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this._http.delete(this.URL + "cuota/" + id, option);
  }

}
