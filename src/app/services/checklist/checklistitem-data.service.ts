import { Injectable } from '@angular/core';
import { Checklist, ChecklistItem } from '../../interfaces/checklists';

@Injectable({
  providedIn: 'root',
})
export class ChecklistitemDataService {
  constructor() {}

  addItem(checklist: Checklist, item: ChecklistItem) {
    checklist.items.push({
      title: item.title,
      checked: false,
    });
  }

  removeItem(checklist: Checklist, item: ChecklistItem) {
    const index: number = checklist.items.indexOf(item);

    if (index > -1) {
      checklist.items.splice(index, 1);
    }
  }

  renameItem(item: ChecklistItem, newName: string): void {
    item.title = newName;
  }

  toggleItem(item: ChecklistItem): void {
    item.checked = !item.checked;
  }
}
