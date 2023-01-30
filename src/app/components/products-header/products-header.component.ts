import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  constructor() {}
  @Output() columsCountChange = new EventEmitter<number>();
  @Output() itemsUpdatedChange = new EventEmitter<string>();
  @Output() sortUpdatedChange = new EventEmitter<string>();

  sort = "desc";
  itemsShowCount = 5;

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortUpdatedChange.emit(newSort);
  }

  onItemsUpdated(newItemsShowCount: number): void {
    this.itemsShowCount = newItemsShowCount;
    this.itemsUpdatedChange.emit(newItemsShowCount.toString());
  }

  onColumnsUpdated(colsNum: number): void {
    this.columsCountChange.emit(colsNum);
  }
}
