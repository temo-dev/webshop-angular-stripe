import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  constructor() {}
  @Output() columsCountChange = new EventEmitter<number>();

  sort = "desc";
  itemsShowCount = 12;

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(newItemsShowCount: number): void {
    this.itemsShowCount = newItemsShowCount;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columsCountChange.emit(colsNum);
  }
}
