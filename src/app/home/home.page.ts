import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonList, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ChecklistDataService } from '../services';
import { Checklist } from '../interfaces/checklists';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonList, {static: false}) slidingList: IonList;

  public checklists: Checklist[] = [];

  constructor(
    public dataService: ChecklistDataService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.storage.get('introShown')
      .then(result => {
        if (result == null) {
          this.storage.set('introShown', true);
          this.navCtrl.navigateRoot('/intro');
        }
      });
  }

  async addChecklist() {
    const alert = await this.alertCtrl.create({
      header: 'New Checklist',
      message: 'Enter the name of your new Checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: this.createChecklist
        }
      ]
    });

    await alert.present();
  }

  async createChecklist(data) {
    await this.dataService.createChecklist(data);
  }

  async renameChecklist(checklist) {
    const alert = await this.alertCtrl.create({
      header: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [{
        type: 'text',
        name: 'name'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameChecklist(checklist, data);
          }
        }
      ]
    });
    await alert.present();
  }

  async removeChecklist(checklist) {
    const list = await this.slidingList.closeSlidingItems();

    await this.dataService.removeChecklist(checklist);
  }
}
