import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirFotoLindaPage } from './subir-foto-linda.page';

const routes: Routes = [
  {
    path: '',
    component: SubirFotoLindaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirFotoLindaPageRoutingModule {}
