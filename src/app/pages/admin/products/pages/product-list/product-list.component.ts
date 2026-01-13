import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminProductService } from '../../data-access/admin-product.service';
import { AdminProduct } from '../../models/admin-product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: AdminProduct[] = [];
  page = 0;
  size = 10;
  total = 0;

  selectedSkus = new Set<string>();
  selectAll = false;

  constructor(
    private service: AdminProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.size);
  }

  load(): void {
    this.service.getProducts(this.page, this.size).subscribe(res => {
      this.products = res.content;
      this.total = res.totalElements;
      this.selectedSkus.clear();
      this.selectAll = false;
    });
  }

  toggle(product: AdminProduct): void {
    const action$ = product.enabled
      ? this.service.disable(product.sku)
      : this.service.enable(product.sku);

    action$.subscribe(() => this.load());
  }

  edit(product: AdminProduct): void {
    this.router.navigate(['/admin/products', product.sku, 'edit']);
  }

  create(): void {
    this.router.navigate(['/admin/products/create']);
  }

  next(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  prev(): void {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  toggleProduct(sku: string, checked: boolean) {
    if (checked) {
      this.selectedSkus.add(sku);
    } else {
      this.selectedSkus.delete(sku);
      this.selectAll = false;
    }
  }

  toggleAll(checked: boolean) {
    this.selectAll = checked;
    this.selectedSkus.clear();

    if (checked) {
      this.products.forEach(p => this.selectedSkus.add(p.sku));
    }
  }

  deleteSelected() {
    if (this.selectedSkus.size === 0) {
      return;
    }

    if (!confirm(`Delete ${this.selectedSkus.size} products?`)) {
      return;
    }

    const skus = [...this.selectedSkus];

    this.service.deleteBatch(skus).subscribe(() => {
      this.load();
    });
  }
}
