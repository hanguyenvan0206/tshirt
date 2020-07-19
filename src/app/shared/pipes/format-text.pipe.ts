import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  transform(value: any, length: number): any {
    return value.substring(0, length) + '...';
  }

}
