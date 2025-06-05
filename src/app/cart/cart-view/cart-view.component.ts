import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  cartItems: Product[] = []; // Initialize with emptry array

  // For Filtering and table view
  displayedColumns: string[] = ['id', 'name', 'price', 'image_url', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  totalAmount: number = 0;
  finalAmount: number = 0;

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      data => {
        this.cartItems = data;
        this.dataSource.data = this.cartItems;
        this.totalAmount = this.getTotalAmount(); // Set total amount
        this.finalAmount = this.getFinalAmount(); // Set Final amount
      });
  }

  // Get Total Amount
  getTotalAmount(): number {
    for (let item of this.cartItems) {
      this.totalAmount += item.price;
    }
    return this.totalAmount;
  }

  // Get amount with 5% discount
  getFinalAmount(): number {
    const fivePercent = this.totalAmount * 0.05;
    this.finalAmount = this.totalAmount - fivePercent;
    return this.finalAmount;
  }

  // Filter of table searchbox
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearCartItems() {
    this.cartService.clearItems().subscribe({
      next: () => {
        alert("Cart is cleared.!");
        this.router.navigate(['/products']); // Navigate back to the product list page.
      },
      error: (err) => {
        console.error('Failed to clear cart', err);
        alert("Something went wrong!");
      }
    });
  }

  checkoutItems(): void {
    // Here we've passed cartItems into method as we want to checkout all cartItems.
    this.cartService.checkoutItems(this.cartItems).subscribe({
      next: ()=> {
        alert("Please proceed for the payments.!")
      }, 
      error: ()=> {
        alert("Issue while checking out.!")
      }
    })
  }

}
