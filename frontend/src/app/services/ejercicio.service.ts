import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from '../models/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  URL: string = 'http://192.168.100.10:3000/api/'

  constructor(private _http: HttpClient) { }

  getEjercicios(): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + 'ejercicio', option);
  }

  getEjercicio(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.URL + "ejercicio/" + id, option);
  }

  addEjercicio(ejercicio: Ejercicio): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(ejercicio);
    return this._http.post(this.URL + "ejercicio", body, option);
  }

  updateEjercicio(ejercicio: Ejercicio): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(ejercicio);
    return this._http.put(this.URL + "ejercicio/" + ejercicio._id, body, option);
  }

  deleteEjercicio(id: string): Observable<any> {
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.delete(this.URL + "ejercicio/" + id, option);
  }

}
