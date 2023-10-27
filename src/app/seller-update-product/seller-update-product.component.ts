import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  updateMessage: string | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
  }
  updateProductForm(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateMessage = 'Product updated successfully';
      }
      setTimeout(() => (this.updateMessage = undefined), 3000);
    });

    this.router.navigate(['/seller-home']);
  }
}
