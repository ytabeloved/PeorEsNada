import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    DateFormatPipe, 
  ],
})
export class ListPage {
  publicaciones: Publication[] = [];

  constructor(
    private pubService: PublicationService,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.cargarPublicaciones();
  }

  async cargarPublicaciones() {
    this.publicaciones = await this.pubService.getAll();
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.pubService.delete(id);
            await this.cargarPublicaciones();
          },
        },
      ],
    });

    await alert.present();
  }
}
