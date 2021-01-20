import {Component, OnInit} from '@angular/core';
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


  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getResults().subscribe((data) => {
      this.dataGroupedByType = _.chain(data)
        .groupBy('Type')
        .toPairs()
        .map(pair => _.zipObject(['type', 'data'], pair))
        .value();
      console.log(this.dataGroupedByType);

    });
  }


}
