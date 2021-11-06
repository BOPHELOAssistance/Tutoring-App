import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreSignupPage } from './pre-signup.page';

const routes: Routes = [
  {
    path: '',
    component: PreSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreSignupPageRoutingModule {}
