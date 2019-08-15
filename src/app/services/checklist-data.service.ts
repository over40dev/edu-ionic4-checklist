import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Checklist} from '../interfaces/checklists';
@Injectable({
  providedIn: 'root'
})
export class ChecklistDataService {

  public checklists: Checklist[] = [];
  public loaded = false;


  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('checklists')
        .then((checklists) => {
          if (checklists != null) {
            this.checklists = checklists;
          }

          this.loaded = true;
          resolve(true);
        });
    });
  }

}
