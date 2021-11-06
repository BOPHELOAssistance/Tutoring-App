import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreSignupPageRoutingModule } from './pre-signup-routing.module';

import { PreSignupPage } from './pre-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreSignupPageRoutingModule
  ],
  declarations: [PreSignupPage]
})
export class PreSignupPageModule {}
