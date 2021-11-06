import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataHelperService } from '../../services/data-helper.service';
import { UtilsProviderService } from '../../services/utils-provider.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { iUser } from '../../models/user';
import firebase from 'firebase';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  maxYear: number;
  currentUser: iUser;
  imagePath: any;
  newFile: boolean;


  constructor(
    public camera: Camera,
    public router: Router,
    public navCtrl: NavController,
    public dataHelper: DataHelperService,
    public utils: UtilsProviderService,
    public userAuth: UserAuthService,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.currentUser = this.userAuth.currentUser;
    this.imagePath = this.currentUser.profileUrl;
    const currentYear = (new Date()).getFullYear();
    this.maxYear = currentYear - 18;
  }

  async pictureClick() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose photo',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera(1);
          }
        }, {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.openCamera(2);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {

          }
        }]
    });
    await actionSheet.present();
  }

  updateProfile() {
    if (!this.currentUser.fullName) {
      this.utils.createToast('Please fill out the required fields!');
      return;
    }
    this.newFile ? this.saveImage() : this.updateData();
  }

  saveImage() {
    const self = this;
    self.utils.presentLoading();
    const storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImages/${filename}.jpg`);

    imageRef.putString(self.imagePath, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
        self.currentUser.profileUrl = url;
        self.updateData();
      });
    });
  }

  updateData() {
    const self = this;
    const uid = localStorage.getItem('uid');
    const updates = {};
    updates['/users/' + uid] = self.currentUser;
    firebase.database().ref().update(updates)
      .then(() => {
        self.utils.stopLoading();
        self.userAuth.setUser(self.currentUser);
        self.utils.createToast('Profile updated!');
        self.navCtrl.back();
      })
      .catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }

  openCamera(src) {
    const self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: self.camera.DestinationType.DATA_URL,
      encodingType: self.camera.EncodingType.JPEG,
      mediaType: self.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: src,
      allowEdit: true
    };

    self.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      self.imagePath = base64Image;
      self.newFile = true;
    }, (err) => {
      console.log(err);
    });
  }

}
