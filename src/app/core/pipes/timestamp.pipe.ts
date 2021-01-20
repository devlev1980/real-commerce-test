import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(unixTime: string): any {
    const date = new Date(+unixTime * 1000);
    return date.toLocaleDateString('he-IL').replace(/\./g, '/');
  }

}
