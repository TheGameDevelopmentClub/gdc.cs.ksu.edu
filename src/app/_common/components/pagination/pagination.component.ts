import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ksu-gdc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() pageNumber = 1;
  @Input() pageSize: number;
  @Input() itemsLoaded: boolean;
  @Input() totalItemCount: number;

  get totalPageCount() {
    return Math.ceil(this.totalItemCount / this.pageSize);
  }

  get leftArrowVisible() {
    return this.pageNumber > 1;
  }
  get rightArrowVisible() {
    return this.pageNumber < this.totalPageCount;
  }

  constructor() { }

  ngOnInit() {
  }

  changePage(page: number) {
    this.pageNumber = page;
    this.pageChange.emit(page);
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
}
