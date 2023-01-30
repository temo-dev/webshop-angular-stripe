import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {
  constructor(private cartService: CartService) {}
  products = [1, 2, 3];
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

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }
}
