import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { HomeComponent } from './components/layout/home/home.component';
import { AlumnoFormComponent } from './components/modules/alumno/alumno-form/alumno-form.component';
import { AlumnoComponent } from './components/modules/alumno/alumno.component';
import { AsistenciaFormComponent } from './components/modules/asistencia/asistencia-form/asistencia-form.component';
import { AsistenciaComponent } from './components/modules/asistencia/asistencia.component';
import { CuotaFormComponent } from './components/modules/cuota/cuota-form/cuota-form.component';
import { CuotaComponent } from './components/modules/cuota/cuota.component';
import { EjercicioFormComponent } from './components/modules/ejercicio/ejercicio-form/ejercicio-form.component';
import { EjercicioComponent } from './components/modules/ejercicio/ejercicio.component';
import { EstadisticasComponent } from './components/modules/estadisticas/estadisticas.component';
import { LoginComponent } from './components/modules/login/login.component';
import { RegistroComponent } from './components/modules/registro/registro.component';
import { CheckRutinaComponent } from './components/modules/rutina/check-rutina/check-rutina.component';
import { RutinaFormComponent } from './components/modules/rutina/rutina-form/rutina-form.component';
import { RutinaComponent } from './components/modules/rutina/rutina.component';
import { AlumnoAsistenciaComponent } from './components/vista-alumno/alumno-asistencia/alumno-asistencia.component';
import { AlumnoCuotasComponent } from './components/vista-alumno/alumno-cuotas/alumno-cuotas.component';
import { AlumnoRutinasComponent } from './components/vista-alumno/alumno-rutinas/alumno-rutinas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'alumno-form/:id', component: AlumnoFormComponent },
  { path: 'cuota', component: CuotaComponent },
  { path: 'cuota/:id/:idAlumno', component: CuotaComponent },
  { path: 'cuota/:id/alumno/:idAlumno', component: CuotaComponent },
  { path: 'cuota-form/:id', component: CuotaFormComponent },
  { path: 'cuota-form/:id/:alumno', component: CuotaFormComponent },
  { path: 'cuota-form/:id/:idAlumno', component: CuotaFormComponent },
  { path: 'cuota-form/cuota/:id/alumno/:idAlumno', component: CuotaFormComponent },
  { path: 'ejercicio', component: EjercicioComponent },
  { path: 'ejercicio-form/:id', component: EjercicioFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ingreso', component: IngresoComponent },
  { path: 'rutina', component: RutinaComponent },
  { path: 'rutina/:id/alumno/:idAlumno', component: RutinaComponent },
  { path: 'rutina-form/:id', component: RutinaFormComponent },
  { path: 'rutina-form/:id/:alumno', component: RutinaFormComponent },
  { path: 'rutina-form/rutina/:id/alumno/:idAlumno', component: RutinaFormComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'asistencia', component: AsistenciaComponent},
  { path: 'asistencia/:id/alumno/:idAlumno', component: AsistenciaComponent },
  { path: 'asistencia-form', component: AsistenciaFormComponent},
  { path: 'asistencia-form/:id', component: AsistenciaFormComponent },
  { path: 'asistencia-form/:id/:alumno', component: AsistenciaFormComponent },
  { path: 'asistencia-form/asistencia/:id/alumno/:idAlumno', component: AsistenciaFormComponent },
  { path: 'alum-asistencia', component: AlumnoAsistenciaComponent },
  { path: 'alumn-rutinas', component: AlumnoRutinasComponent},
  { path: 'alumn-cuotas', component: AlumnoCuotasComponent},
  { path: 'check-rutinas/:id/:alumno', component: CheckRutinaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
