import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApiService} from '../../../sevices/api.service';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  dataGroupedByType: any[] = [];
  imgAlt: string = '';
  @ViewChild('toggleBtn', {static: false}) toggleBtn: ElementRef;
  isShowPrimary: boolean = true;
  isShowGrid: boolean = true;
  searchTerm: string = '';
  isRefresh: boolean = false;
  sortType: string = 'asc'; // ascending
  isShowInput: boolean = false;
  tab1Title: string = '';
  tab2Title: string = '';
  tab3Title: string = '';
  isShowSorDirection: boolean = true;
  private sub: Subscription;


  constructor(private api: ApiService, private render: Renderer2,private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getDataFromServer();

  }

  /**
   * Get results from mock.json and group results by Type
   */
  getDataFromServer(): void {
    this.isRefresh = true;
    setTimeout(() => {
      this.sub = this.api.getResults()
        .subscribe((data) => {
          if (data) {
            this.cdr.markForCheck();
            this.isRefresh = false;
            this.dataGroupedByType =
              _.chain(data)
                .groupBy('Type')
                .toPairs()
                .map(pair => _.zipObject(['type', 'data'], pair))
                .value();
          }
        });
    }, 1000);

  }

  /**
   * Toggle Grid View -> List View
   */
  onToggleView(): void {
    this.isShowPrimary = !this.isShowPrimary;
    this.isShowGrid = !this.isShowGrid;
  }

  /**
   * Clear search input
   */
  onClearSearch(): void {
    this.searchTerm = '';
  }

  /**
   * Sort results by direction 'asc' or 'desc'
   */
  onSortData(): void {
    this.isShowSorDirection = !this.isShowSorDirection;
    if (this.sortType === 'asc') {
      this.sortType = 'desc';
    } else {
      this.sortType = 'asc';
    }
  }

  /**
   * Show input in tabs by index
   *
   */
  onChangeType(): void {
    this.isShowInput = true;
  }

  /**
   * Save tab 1 name into variable
   * @param name: string;
   */
  onInputTab1(name: string): void {
    this.tab1Title = name;
  }

  /**
   * Save tab 2 name into variable
   * @param name: string;
   */
  onInputTab2(name: string): void {
    this.tab2Title = name;
  }

  /**
   * Save tab 3 name into variable
   * @param name: string;
   */
  onInputTab3(name: string): void {
    this.tab3Title = name;
  }

  /**
   * Save tabs new name in UI (not in server)
   * @param index: number
   */
  onSaveTitle(index: number): void {
    this.dataGroupedByType.forEach((item) => {
      switch (index) {
        case 0:
          item.Title = this.tab1Title;
          this.sendTitleToServer(this.tab1Title);
          this.isShowInput = false;
          break;
        case 1:
          item.Title = this.tab2Title;
          this.sendTitleToServer(this.tab2Title);
          this.isShowInput = false;
          break;
        case 2:
          item.Title = this.tab3Title;
          this.sendTitleToServer(this.tab3Title);
          this.isShowInput = false;
          break;
      }
    });
  }

  /**
   * Fake send the title of the tab to the server
   * @param title: string
   */
  sendTitleToServer(title: string): void {
    this.api.saveType(title).subscribe(res => {
      if (res) {
        console.log('Type saved');
      } else {
        console.log('Something went wrong');
      }
    });
  }

  updateUrl(event: any): string {
    return this.imgAlt = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
