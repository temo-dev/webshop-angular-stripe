import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";
import { StoreService } from "../../services/store.service";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  cols = 3;
  category: string | undefined;
  rowHeight = ROW_HEIGHT[this.cols];

  products: Array<Product> | undefined;
  productsSubcription: Subscription | undefined;
  sort: string = "desc";
  count: string = "5";

  ngOnInit(): void {
    this.getProducts(this.count, this.sort);
  }

  getProducts(_count: string, _sort: string): void {
    this.productsSubcription = this.storeService
      .getAllProducts(_count, _sort)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  getProductsBycategory(category: string, sort: string, limit: string): void {
    this.productsSubcription = this.storeService
      .getAllProductsInCategory(category, sort, limit)
      .subscribe((products) => {
        this.products = products;
      });
  }

  onItemsUpdatedChange(_count: string): void {
    this.count = _count;
    this.getProducts(this.count, this.sort);
  }

  onSortUpdatedChange(_sort: string): void {
    this.sort = _sort;
    this.getProducts(this.count, this.sort);
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    if (newCategory == "all") {
      this.getProducts(this.count, this.sort);
    } else {
      this.getProductsBycategory(newCategory, this.sort, this.count);
    }
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

  ngOnDestroy(): void {
    if (this.productsSubcription) {
      this.productsSubcription.unsubscribe();
    }
  }
}
