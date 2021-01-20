import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], sortType: string): any {
    console.log(items);
    console.log(sortType);
    if (!items || !sortType) {
      return;
    }
    return items.sort((a, b) => {
      if (sortType === 'asc') {
        if (a.Title < b.Title) {
          return -1;
        }
      }
      if (sortType === 'desc') {
        if (a.Title > b.Title) {
          return 1;
        }
      } else {
        return 0;
      }


      // if (a.Title < b.Title ) {
      //   return -1;
      // } else if (a.Title > b.Title ) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    });
  }
}
