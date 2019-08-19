import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ChecklistDataService } from './services';

const {SplashScreen, StatusBar} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private dataService: ChecklistDataService
  ) {
    this.dataService.loadChecklists();

    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });

    StatusBar.hide().catch((err) => {
      console.warn(err);
    });

  }

}
