import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true // 👈 Esto es obligatorio en proyectos standalone
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const fecha = new Date(value);
    return fecha.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
