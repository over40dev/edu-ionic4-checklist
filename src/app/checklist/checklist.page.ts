import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from '@ionic/angular';
import { Checklist, ChecklistItem } from '../interfaces/checklists';
import { ActivatedRoute } from '@angular/router';
import { ChecklistDataService } from '../services/checklist/checklist-data.service';

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

    if (this.dataService.loaded) {
      this.checklist = this.dataService.getChecklist(this.slug);
    } else {
      this.dataService.loadChecklists().then(() => {
        this.checklist = this.dataService.getChecklist(this.slug);
      });
    }
  }

  addItem() {
    const itemDialong = this.alertCtrl.create({
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
            console.log('additem', data, typeof data);
            this.dataService.addItem(this.checklist.id, data);
          },
        },
      ],
    }).then((prompt) => {
      prompt.present();
    });
  }

  removeItem(item: ChecklistItem) {
    this.slidingList.closeSlidingItems()
      .then(() => {
        this.dataService.removeItem(this.checklist, item);
      });
  }

  renameItem(item: ChecklistItem) {
    this.alertCtrl.create({
      header: 'Rename Item',
      message: 'Enter the new name of the task for this checklist below',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameItem(item, data.name);
          }
        }
      ]
    });
  }

  toggleItem(item: ChecklistItem) {
    this.dataService.toggleItem(item);
    console.log('toggItem', item);
  }
}
