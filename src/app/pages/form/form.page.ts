import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PublicationService } from 'src/app/services/publication.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class FormPage {
  form: FormGroup;
  imagen: string = '';

  constructor(
    private fb: FormBuilder,
    private pubService: PublicationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.imagen = 'data:image/jpeg;base64,' + image.base64String;
  }

  async guardar() {
    if (this.form.invalid) return;

    const publicacion = {
      id: Date.now(),
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      fecha: new Date().toISOString(),
      imagen: this.imagen,
    };

    await this.pubService.save(publicacion);
    this.router.navigateByUrl('/list');
  }
}
