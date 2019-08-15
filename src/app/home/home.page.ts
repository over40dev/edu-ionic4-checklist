import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonList, NavController } from '@ionic/angular';
import { ChecklistDataService } from '../services/checklist-data.service';
import { Checklist } from '../interfaces/checklists';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public dataService: ChecklistDataService) {
  }

}
