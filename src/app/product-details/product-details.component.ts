import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productInfo: product | undefined;
  productQuantity: number = 1;
  constructor(
    private activeRoute: ActivatedRoute,
    private products: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.products.getProduct(productId).subscribe((res) => {
        this.productInfo = res;
      });
  }

  handleQuantity(value: string) {
    if(this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    }
    if(this.productQuantity > 1 && value ==='minus'){
      this.productQuantity -= 1;
    }
  }
}
