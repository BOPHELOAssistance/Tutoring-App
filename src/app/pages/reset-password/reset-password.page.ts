import { Component, OnInit } from '@angular/core';
import { UtilsProviderService } from '../../services/utils-provider.service';
import { NavController } from '@ionic/angular';
import { DataHelperService } from '../../services/data-helper.service';
import firebase from 'firebase';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;

  constructor(
    public dataHelper: DataHelperService,
    public utils: UtilsProviderService,
    public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  resetPassword() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const showError = !re.test(String(this.email).toLowerCase());

    if (showError) {
      this.utils.createToast('Invalid email address!');
      return;
    }

    const self = this;
    self.utils.presentLoading();
    firebase.auth().sendPasswordResetEmail(self.email)
      .then(() => {
        self.utils.stopLoading();
        self.utils.createToast('Password reset link has been sent to your email address!');
        self.navCtrl.back();
      })
      .catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }

}
