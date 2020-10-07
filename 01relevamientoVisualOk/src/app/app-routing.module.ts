import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './componentes/listado/listado.component';
import { SubirFotoFeaComponent } from './componentes/subir-foto-fea/subir-foto-fea.component';
import { SubirFotoLindaComponent } from './componentes/subir-foto-linda/subir-foto-linda.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './home/login/login.component';
// import { RegistroComponent } from './home/registro/registro.component';

const routes: Routes = [
  {path: 'splash',loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)},
  {path: '', redirectTo: 'splash', pathMatch: 'full'},
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'subirFotoLinda',component: SubirFotoLindaComponent},
  {path: 'subirFotoFea',component: SubirFotoFeaComponent},
  {path: 'listado',component: ListadoComponent},
  // {path: 'registro',component: RegistroComponent},
  // {path: '',component: HomePage},
  {path:'**', pathMatch:'full' ,redirectTo:'home'},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
