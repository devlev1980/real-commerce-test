import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      const date = new Date(+item.Year * 1000).toLocaleDateString('he-IL').replace(/\./g, '/');
      return item.Title.toLowerCase().includes(searchTerm) || date.toLowerCase().includes(searchTerm);
    });

  }

}
