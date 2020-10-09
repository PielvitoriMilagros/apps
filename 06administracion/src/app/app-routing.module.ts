import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SalaCuartoAComponent } from './componentes/sala-cuarto-a/sala-cuarto-a.component';
import { SalaCuartoBComponent } from './componentes/sala-cuarto-b/sala-cuarto-b.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './home/login/login.component';
import { RegistroComponent } from './home/registro/registro.component';
// import { RegistroComponent } from './home/registro/registro.component';

const routes: Routes = [
  {path: 'splash',loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)},
  {path: '', redirectTo: 'splash', pathMatch: 'full'},
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'salaCuartoA',component: SalaCuartoAComponent},
  {path: 'salaCuartoB',component: SalaCuartoBComponent},
  {path: 'registro',component: RegistroComponent},
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
