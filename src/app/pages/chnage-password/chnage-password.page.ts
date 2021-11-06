import { Component, OnInit } from '@angular/core';
import { UtilsProviderService } from '../../services/utils-provider.service';
import { UserAuthService } from '../../services/user-auth.service';
import { NavController } from '@ionic/angular';
import { DataHelperService } from '../../services/data-helper.service';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.page.html',
  styleUrls: ['./chnage-password.page.scss'],
})
export class ChnagePasswordPage implements OnInit {

  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(
    public utils: UtilsProviderService,
    public userAuth: UserAuthService,
    public navCtrl: NavController,
    public dataHelper: DataHelperService,
  ) { }

  ngOnInit() {
  }

  updatePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.utils.createToast('Passwords do not match!');
      return;
    }

    const self = this;
    const user: iUser = this.userAuth.currentUser;
    self.utils.presentLoading();
    self.userAuth.loginUser(user.email, self.currentPassword)
      .then((firebaseUser) => {
        if (firebaseUser) {
          self.userAuth.updatePassword(self.newPassword).then(() => {
            self.utils.stopLoading();
            self.utils.createToast('Password has been updated successfully!');
            self.userAuth.logoutUser();
          })
            .catch((e) => {
              self.utils.stopLoading();
              self.utils.createToast(e.message);
            });
        } else {
          self.utils.stopLoading();
          self.navCtrl.back();
        }
      })
      .catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }



}
