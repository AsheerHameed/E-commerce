import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})

export class SellerHomeComponent implements OnInit {
  products: product[] | undefined;
  productDeleteMessage: string | undefined;
  delteIcon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) {}
  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((res) => {
      this.productDeleteMessage = 'Product deleted successfully';
    });
    setTimeout(() => (this.productDeleteMessage = undefined), 2000);
    this.list();
  }
updateProduct(id: number){
  
}
  list() {
    this.product.productList().subscribe((res) => {
      this.products = res;
    });
  }
}
