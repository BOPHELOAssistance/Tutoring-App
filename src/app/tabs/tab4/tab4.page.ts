import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { DataHelperService } from '../../services/data-helper.service';
import { DynamicContentPage } from 'src/app/pages/dynamic-content/dynamic-content.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    public userAuth: UserAuthService,
    public dataHelper: DataHelperService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openContentModal(contentKey: string) {
    const displayContent = this.dataHelper.appContent[contentKey];
    const modal = await this.modalController.create({
      component: DynamicContentPage,
      componentProps: {
        pageTitle: displayContent.pageTitle,
        content: displayContent.content
      }
    });
    return await modal.present();
  }

}
