import { Rutina } from "./rutina";
import { Cuota } from "./cuota";
import { Asistencia } from "./asistencia";

export class Alumno {
    _id: string;
    apellido: string;
    nombres: string;
    dni: number;
    fechaNacimiento: string;
    celular: number;
    domicilio: string;
    email: string;
    fechaInicio: string;
    plan: string;
    asistencias: Array<Asistencia>;
    rutinas: Array<Rutina>;
    cuotas: Array<Cuota>;

    constructor() {

    }
}