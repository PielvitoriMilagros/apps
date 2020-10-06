import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
  // {path: 'registro',component: RegistroComponent},
  // {path: '',component: HomePage},
  {path:'**', pathMatch:'full' ,redirectTo:'home'},
  {
    path: 'subir-foto-linda',
    loadChildren: () => import('./subir-foto-linda/subir-foto-linda.module').then( m => m.SubirFotoLindaPageModule)
  },
  {
    path: 'subir-foto-fea',
    loadChildren: () => import('./subir-foto-fea/subir-foto-fea.module').then( m => m.SubirFotoFeaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
