import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);

    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart", "Ok", { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  onClearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared", "Ok", { duration: 3000 });
  }

  removeFromCart(itemRemoved: CartItem): void {
    const filteredItem = this.cart.value.items.filter(
      (item) => item.id !== itemRemoved.id
    );
    this.cart.next({ items: filteredItem });
    this._snackBar.open("Removed item !", "Ok", { duration: 3000 });
  }

  addQuantity(itemAdd: CartItem): void {
    const newItems = this.cart.value.items.map((item) => {
      if (item.id === itemAdd.id) {
        item.quantity += 1;
      }
      return item;
    });
    this.cart.next({ items: newItems });
    this._snackBar.open("1 item added to cart  !", "Ok", { duration: 3000 });
  }

  removeQuantity(itemRemove: CartItem): void {
    if (itemRemove.quantity === 1) {
      this.removeFromCart(itemRemove);
    } else {
      const newItems = this.cart.value.items.map((item) => {
        if (itemRemove.quantity > 1 && item.id === itemRemove.id) {
          item.quantity -= 1;
        }
        return item;
      });
      this.cart.next({ items: newItems });
      this._snackBar.open("1 item removed from cart  !", "Ok", {
        duration: 3000,
      });
    }
  }
}
