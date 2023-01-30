import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
  dataSource: Array<CartItem> = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.onClearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addQuantity(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http
      .post("https://angular-shop-chi.vercel.app/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        console.log(res);
        let stripe = await loadStripe(
          "pk_test_51MW2jLCg20bhN5lJ1QKTym4AEyaFvZ2TyeD4wRaq4Xb5J2EbHBSwntfWncDyDMQFdnl8usIg4pEyqfwrJSjz0qn300UomE50OD"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
