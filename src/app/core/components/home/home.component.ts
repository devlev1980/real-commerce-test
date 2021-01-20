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


}
