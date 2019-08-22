import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Checklist, ChecklistItem } from '../../interfaces/checklists';

@Injectable({
  providedIn: 'root',
})
export class ChecklistDataService {
  public checklists: Checklist[] = [];
  public loaded = false;

  constructor(private storage: Storage) {}

  loadChecklists(): Promise<boolean> {
    return new Promise(resolve => {
      this.storage.get('checklists').then(checklists => {
        if (checklists !== null) {
          this.checklists = checklists;
        }

        this.loaded = true;
        resolve(true);
      });
    });
  }

  createChecklist(data) {
    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: [],
    });

    this.save();
  }

  renameChecklist(checklist, data) {
    const index = this.checklists.indexOf(checklist);
    if (index > -1) {
      this.checklists[index].title = data.name;

      this.save();
    }
  }

  removeChecklist(checklist) {
    const index = this.checklists.indexOf(checklist);
    if (index > -1) {
      this.checklists.splice(index, 1);

      this.save();
    }
  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(id: string, data?: any) {
    console.log('addItem', id, data);
    this.getChecklist(id).items.push({
      title: data.name,
      checked: false,
    });

    this.save();
  }

  removeItem(checklist: Checklist, item: ChecklistItem) {
    const index: number = checklist.items.indexOf(item);
    if (index > -1) {
      checklist.items.splice(index, 1);

      this.save();
    }
  }

  renameItem(item: ChecklistItem, newName: string) {
    item.title = newName;

    this.save();
  }

  toggleItem(item: ChecklistItem) {
    item.checked = !item.checked;

    this.save();
  }

  save() {
    this.storage.set('checklists', this.checklists);
  }

  private generateSlug(title): string {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    const slug: string = title.toLowerCase().replace(/\s+/g, '-');
    // check for uniqueness of slug
    const exists = this.checklists.filter(
      checklist => checklist.id.substring(0, slug.length) === slug
    );
    // If the title is already being used, add a number to make the slug unique
    return exists.length > 0 ? slug + exists.length.toString() : slug;
  }
}
