import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/layout/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AlumnoComponent } from './components/modules/alumno/alumno.component';
import { PlanComponent } from './components/modules/plan/plan.component';
import { RutinaComponent } from './components/modules/rutina/rutina.component';
import { EjercicioComponent } from './components/modules/ejercicio/ejercicio.component';
import { CuotaComponent } from './components/modules/cuota/cuota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/modules/usuario/usuario.component';
import { AlumnoFormComponent } from './components/modules/alumno/alumno-form/alumno-form.component';
import { EjercicioFormComponent } from './components/modules/ejercicio/ejercicio-form/ejercicio-form.component';
import { CuotaFormComponent } from './components/modules/cuota/cuota-form/cuota-form.component';
import { RutinaFormComponent } from './components/modules/rutina/rutina-form/rutina-form.component';
import { PlanFormComponent } from './components/modules/plan/plan-form/plan-form.component';
import { LoginComponent } from './components/modules/login/login.component';

import { LoginService } from './services/login.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistroComponent } from './components/modules/registro/registro.component';
import { NgxDataTableModule } from 'angular-9-datatable';
import { FilterPipe } from './pipes/filter.pipe';
import { EstadisticasComponent } from './components/modules/estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SinCaracterEspecial } from './directivas/validacion-caracteresespeciales.directive';
import { ValidacionPasswordDirective } from './directivas/validacion-password.directive';
import { PrecioPipe } from './pipes/precio.pipe';
import { AsistenciaComponent } from './components/modules/asistencia/asistencia.component';
import { AsistenciaFormComponent } from './components/modules/asistencia/asistencia-form/asistencia-form.component';
import { AlumnoAsistenciaComponent } from './components/vista-alumno/alumno-asistencia/alumno-asistencia.component';
import { AlumnoRutinasComponent } from './components/vista-alumno/alumno-rutinas/alumno-rutinas.component';
import { AlumnoCuotasComponent } from './components/vista-alumno/alumno-cuotas/alumno-cuotas.component';
import { CheckRutinaComponent } from './components/modules/rutina/check-rutina/check-rutina.component';
import { SeriesPipe } from './pipes/series.pipe';
import { RepePipe } from './pipes/repe.pipe';
import { DescansoPipe } from './pipes/descanso.pipe';
import { IngresoComponent } from './components/ingreso/ingreso.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AlumnoComponent,
    PlanComponent,
    RutinaComponent,
    EjercicioComponent,
    CuotaComponent,
    UsuarioComponent,
    AlumnoFormComponent,
    EjercicioFormComponent,
    CuotaFormComponent,
    RutinaFormComponent,
    PlanFormComponent,
    LoginComponent,
    RegistroComponent,
    FilterPipe,
    EstadisticasComponent,
    SinCaracterEspecial,
    ValidacionPasswordDirective,
    PrecioPipe,
    AsistenciaComponent,
    AsistenciaFormComponent,
    AlumnoAsistenciaComponent,
    AlumnoRutinasComponent,
    AlumnoCuotasComponent,
    CheckRutinaComponent,
    SeriesPipe,
    RepePipe,
    DescansoPipe,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxDataTableModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
