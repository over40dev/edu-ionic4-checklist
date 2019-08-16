import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklists';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  generateSlug(title: string): string {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    return title.toLowerCase().replace(/\s+/g, '-');
  }
}
