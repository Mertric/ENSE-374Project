import { Component } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AddEventToDoPage } from "../components/add-event-to-do/add-event-to-do.page";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private modalCtrl: ModalController) {}
  async showmodal() {
    const modal = await this.modalCtrl.create({ component: AddEventToDoPage });
    await modal.present();
  }
}
