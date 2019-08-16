import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Checklist, ChecklistItem } from '../interfaces/checklists';
import { ChecklistitemDataService } from './checklistitem-data.service';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root',
})
export class ChecklistDataService {
  public checklists: Checklist[] = [];
  public loaded = false;

  constructor(
    private storage: Storage,
    private itemDS: ChecklistitemDataService,
    private util: UtilService
  ) {}

  load(): Promise<boolean> {
    return Promise.resolve(true);
  }

  createChecklist(data): void {
    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: [],
    });

    this.save();
  }

  renameChecklist(checklist, data): void {
    const index = this.checklists.indexOf(checklist);
    if (index > -1) {
      this.checklists[index].title = data.name;
      this.save();
    }
  }

  removeChecklist(checklist): void {
    const index = this.checklists.indexOf(checklist);
    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklist: Checklist, item: ChecklistItem): void {
    this.itemDS.addItem(checklist, item);
    this.save();
  }

  removeItem(checklist: Checklist, item: ChecklistItem): void {
    this.itemDS.removeItem(checklist, item);
    this.save();
  }

  renameItem(item: ChecklistItem, newName: string): void {
    item.title = newName;
    this.save();
  }

  toggleItem(item: ChecklistItem): void {
    item.checked = !item.checked;
    this.save();
  }

  save(): void {
    this.storage.set('checklists', this.checklists);
  }

  private generateSlug(title): string {
    const slug: string = this.util.generateSlug(title);

    // check for uniqueness of slug
    const exists = this.checklists.filter(checklist =>
      checklist.id.substring(0, slug.length) === slug
    );
    // If the title is already being used, add a number to make the slug unique
    return exists.length > 0 ? slug + exists.length.toString() : slug;
  }
}
