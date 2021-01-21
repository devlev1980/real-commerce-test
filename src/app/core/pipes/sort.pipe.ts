import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], sortType: string): any {
    if (!items || !sortType) {
      return;
    }
    const direction = sortType === 'desc' ? -1 : 1;

    return items.sort((a, b) => {
      if (a.Title < b.Title || a.Year < a.Year ) {
        return -1 * direction;
      } else if (a.Title > b.Title || a.Year > b.Year ) {
        return 1 * direction;
      }
    });


  }
}
