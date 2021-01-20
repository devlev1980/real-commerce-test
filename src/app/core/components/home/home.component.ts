import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApiService} from '../../../sevices/api.service';
import {IData, IResult} from '../../models/result';
import {groupBy, mergeMap, reduce} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private results: IData[];
  dataGroupedByType: any[] = [];
  imgAlt: string = '';
  @ViewChild('toggleBtn', {static: false}) toggleBtn: ElementRef;
  isShowPrimary: boolean = true;
  isShowGrid: boolean = true;
  searchTerm: string = '';
  isRefresh: boolean = false;
  sortType: string = 'asc';
  isShowInput: boolean = false;
  tab1Title: string = '';
  tab2Title: string = '';
  tab3Title: string = '';


  constructor(private api: ApiService, private render: Renderer2) {
  }

  ngOnInit(): void {
    this.getDataFromServer();

  }

  getDataFromServer(): void {
    this.isRefresh = true;

    setTimeout(() => {
      this.isRefresh = true;
      this.api.getResults().subscribe((data) => {
        if (data) {
          this.isRefresh = false;
          this.dataGroupedByType = _.chain(data)
            .groupBy('Type')
            .toPairs()
            .map(pair => _.zipObject(['type', 'data'], pair))
            .value();
          console.log(this.dataGroupedByType);
        }


      });
    }, 1000);
  }


  onError(): string {
    this.imgAlt = '';
    return '';
  }

  onToggleView(): void {
    this.isShowPrimary = !this.isShowPrimary;
    this.isShowGrid = !this.isShowGrid;
  }

  onClearSearch(): void {
    this.searchTerm = '';
  }


  onSortData(): void {
    this.sortType = 'desc';
    this.dataGroupedByType.map(item => {
      return item.data.sort((a, b) => {
        if (a.Title < b.Title && this.sortType === 'asc') {
          return -1;
        } else if (a.Title > b.Title || this.sortType === 'desc') {
          return 1;
        } else {
          return 0;
        }
      });
    });


  }

  onChangeType(i: number): void {
    this.isShowInput = true;
  }

  onInputTab1(name: string, index: number): void {
    this.tab1Title = name;
  }

  onInputTab2(name: string, index: number): void {
    this.tab2Title = name;
  }

  onInputTab3(name: string, index: number): void {
    this.tab3Title = name;
  }

  onSaveTitle(i: number): void {
    this.dataGroupedByType.forEach((item) => {

      switch (i) {
        case 0:
          item.Title = this.tab1Title;
          this.isShowInput = false;
          break;
        case 1:
          item.Title = this.tab2Title;
          this.isShowInput = false;
          break;
        case 2:
          item.Title = this.tab3Title;
          this.isShowInput = false;
          break;
      }

      console.log(this.dataGroupedByType);
    });
  }
}
