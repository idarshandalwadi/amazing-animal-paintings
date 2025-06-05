import { Component, OnInit } from '@angular/core';
import { ProdutService } from '../produt.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { CommonUtilsService } from 'src/app/common-utils.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProdutService, private cartService: CartService,
    private commonUtils: CommonUtilsService) { }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = "filter"; // To select default option

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data; //Need to initialize 
    });
    console.log(this.products);
  }

  getProducts() {
    return this.products;
  }

  // Add product to card and display popup.
  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.commonUtils.showSnackBar("Product added to cart.!")
      }
    })
  }

  // Apply filter using MatInputModule on UI
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase(); // Need to convert user input into lowercase

    // From products array filterout products which matches with the searchTerm
    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )

    //Also need to apply sorting after the applying filter.
    this.sortProducts(this.sortOrder);
  }

  // For sorting - MatSelectModule
  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder.match("priceLowHigh")) {
      this.filteredProducts.sort((a,b) => a.price - b.price);
    } else if (this.sortOrder.match("priceHighLow")) {
      this.filteredProducts.sort((a,b) => b.price - a.price);
    }
  }

  // Mark as favorite and remove from favorite
  markAsFavorite(product: Product): void {
    product.is_favorite = !product.is_favorite;
    if (!product.is_favorite) {
      this.commonUtils.showSnackBar("Product Removed From Favorite.");
    } else {
      this.commonUtils.showSnackBar("Product Marked as Favorite.!");
    }
  }
}
