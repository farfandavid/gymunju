import { Alumno } from "./alumno";

export class Usuario {
    _id: string;
    username: string;
    password: string;
    tipo: number;
    alumno: Alumno;

    Usuario(_id?: string, username?: string, password?: string, tipo?: number, alumno?: Alumno) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.tipo = tipo;
        this.alumno = alumno;
    }
}
