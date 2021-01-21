import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  itemDetailsData: any;

  constructor() {

  }

  ngOnInit(): void {
    this.itemDetailsData = history.state.data;
  }

}
