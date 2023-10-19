import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: undefined | product[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.productData = data;
    });
  }
}
