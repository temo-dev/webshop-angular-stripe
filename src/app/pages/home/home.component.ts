import { Component, OnInit } from "@angular/core";
const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {
  constructor() {}
  products = [1, 2, 3, 4, 5, 6, 7];
  cols = 3;
  category: string | undefined;
  rowHeight = ROW_HEIGHT[this.cols];

  ngOnInit(): void {}
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
