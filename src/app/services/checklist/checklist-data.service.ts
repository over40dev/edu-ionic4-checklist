import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Checklist, ChecklistItem } from '../../interfaces/checklists';
import { ChecklistitemDataService } from './checklistitem-data.service';

@Injectable({
  providedIn: 'root',
})
export class ChecklistDataService {
  public checklists: Checklist[] = [];
  public loaded = false;

  constructor(
    private storage: Storage,
    private dataService: ChecklistitemDataService,
  ) {}

  loadChecklists(): Promise<boolean> {
    return Promise.resolve(true);
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

  /*
   Implementation of Checklist Items are in separate file reference in imports.
  */

  async addItem(checklist: Checklist, item: ChecklistItem) {
    await this.dataService.addItem(checklist, item);
    this.save();
  }

  async removeItem(checklist: Checklist, item: ChecklistItem) {
    await this.dataService.removeItem(checklist, item);
    this.save();
  }

  async renameItem(item: ChecklistItem, newName: string) {
    await this.dataService.renameItem(item, newName);
    this.save();
  }

  async toggleItem(item: ChecklistItem) {
    await this.dataService.toggleItem(item);
    this.save();
  }

  async save() {
    await this.storage.set('checklists', this.checklists);
  }

  private generateSlug(title): string {

    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    const slug: string = title.toLowerCase().replace(/\s+/g, '-');
    // check for uniqueness of slug
    const exists = this.checklists
      .filter(checklist =>
        checklist.id.substring(0, slug.length) === slug);
      // If the title is already being used, add a number to make the slug unique
    return exists.length > 0 ? slug + exists.length.toString() : slug;
  }
}
