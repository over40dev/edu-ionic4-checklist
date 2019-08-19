import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from '@ionic/angular';
import { Checklist, ChecklistItem } from '../interfaces/checklists';
import { ActivatedRoute } from '@angular/router';
import { ChecklistDataService } from '../services';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  @ViewChild(IonList, { static: false }) slidingList: IonList;

  public checklist: Checklist;
  private slug: string;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: ChecklistDataService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    this.loadCheckList();
  }

  loadCheckList() {
    if (this.dataService.loaded) {
      this.checklist = this.dataService.getChecklist(this.slug);
    } else {
      this.dataService.loadChecklists().then(() => {
        this.checklist = this.dataService.getChecklist(this.slug);
      });
    }
  }

  async addChecklist() {
    const itemDialong = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Enter the name the task for this checklist',
      inputs: [
        {
          type: 'text',
          name: 'name',
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
            console.log('additem', data);
            this.dataService.addItem(this.checklist, data);
          },
        },
      ],
    });

    await itemDialong.present();
  }

  removeItem(item: ChecklistItem) {
    const index = this.checklist.items.indexOf(item);
    if (index > -1) {
      this.dataService.removeItem(this.checklist, item);
    }
  }

  renameItem(item: ChecklistItem) {
    console.log('rename', item);
    // this.dataService.renameItem(item);
  }

  toggleItem(item: ChecklistItem) {
    console.log('toggItem', item);
    // this.dataService.toggleItem(item);
  }
}
