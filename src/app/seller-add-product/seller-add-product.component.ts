import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}
  addProductForm(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'product added succesfully';
      } 
      setTimeout(() => this.addProductMessage = undefined,2000)
    });

  }
}
