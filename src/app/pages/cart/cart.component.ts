import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "../../models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        id: 1,
        product: "https://via.placeholder.com/150",
        name: "snikers",
        price: 150,
        quantity: 1,
      },
      {
        id: 2,
        product: "https://via.placeholder.com/150",
        name: "snikersssdasdasdasdasdasdasdasdasdass",
        price: 250,
        quantity: 2,
      },
      {
        id: 3,
        product: "https://via.placeholder.com/150",
        name: "snikers",
        price: 350,
        quantity: 3,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
