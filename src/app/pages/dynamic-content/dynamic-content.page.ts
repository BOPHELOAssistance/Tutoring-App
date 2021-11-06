import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.page.html',
  styleUrls: ['./dynamic-content.page.scss'],
})
export class DynamicContentPage implements OnInit {

  @Input() pageTitle: string;
  @Input() content: string;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
