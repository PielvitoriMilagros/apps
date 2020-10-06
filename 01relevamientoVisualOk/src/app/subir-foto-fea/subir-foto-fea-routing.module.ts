import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirFotoFeaPage } from './subir-foto-fea.page';

const routes: Routes = [
  {
    path: '',
    component: SubirFotoFeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirFotoFeaPageRoutingModule {}
