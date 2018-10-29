import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ksu-gdc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() totalItemCount: number;
  @Input() pageNumber = 1;
  @Input() pageSize: number;

  totalPageCount: number;

  rightArrowVisible: boolean;
  leftArrowVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.setTotalPageCount();
    this.setView();
  }

  changePage(page: number) {
    this.pageNumber = page;
    this.initialize();
    this.pageChange.emit(page);
  }

  private setTotalPageCount() {
    this.totalPageCount = Math.ceil(this.totalItemCount / this.pageSize);
  }

  moveNextPage() {
    if (this.pageNumber < this.totalPageCount) {
      this.changePage(this.pageNumber + 1);
    }
  }

  movePrevPage() {
    if (this.pageNumber > 1) {
      this.changePage(this.pageNumber - 1);
    }
  }

  private setView() {
    this.leftArrowVisible = this.pageNumber > 1;
    this.rightArrowVisible = this.pageNumber < this.totalPageCount;
  }
}
