import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publication } from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private KEY = 'publicaciones';

  async getAll(): Promise<Publication[]> {
    const { value } = await Preferences.get({ key: this.KEY });
    return value ? JSON.parse(value) : [];
  }

  async save(publication: Publication): Promise<void> {
    const publicaciones = await this.getAll();
    publicaciones.push(publication);
    await Preferences.set({ key: this.KEY, value: JSON.stringify(publicaciones) });
  }

  async delete(id: number): Promise<void> {
    let publicaciones = await this.getAll();
    publicaciones = publicaciones.filter(p => p.id !== id);
    await Preferences.set({ key: this.KEY, value: JSON.stringify(publicaciones) });
  }
}
