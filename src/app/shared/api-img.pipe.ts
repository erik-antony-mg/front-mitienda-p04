import { Pipe, PipeTransform } from '@angular/core';
import { enviroment } from 'src/environments/enviroment';

@Pipe({
  name: 'apiImg'
})
export class ApiImgPipe implements PipeTransform {

  transform(value: string): string {
    return `${enviroment.apiBase}/media/${value}`;
  }

}
