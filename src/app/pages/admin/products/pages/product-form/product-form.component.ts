import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminProductService} from '../../data-access/admin-product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminProduct} from '../../models/admin-product.model';
import {CreateProductRequest} from '../../models/create-product.request';
import {UpdateProductRequest} from '../../models/update-product.request';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup<{
    sku: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string>;
    price: FormControl<number>;
    enabled: FormControl<boolean>;
  }>;

  loading = false;
  successMessage = '';
  errorMessage = '';
  sku: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: AdminProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sku = this.route.snapshot.paramMap.get('sku');

    this.form = this.fb.group({
      sku: new FormControl({value: '', disabled: !!this.sku}, {nonNullable: true, validators: Validators.required}),
      name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl('', {nonNullable: true}),
      price: new FormControl(0, {nonNullable: true, validators: [Validators.required, Validators.min(0)]}),
      enabled: new FormControl(true, {nonNullable: true})
    });

    if (this.sku) {
      this.loadProduct(this.sku);
    }
  }

  get formControls() {
    return this.form.controls;
  }

  private loadProduct(sku: string) {
    this.loading = true;

    this.service.getProduct(sku).subscribe({
      next: (p: AdminProduct) => {
        console.log('Product from API:', p)
        this.loading = false;

        this.form.get('sku')?.enable();

        this.form.patchValue({
          sku: p.sku,
          name: p.name,
          description: p.description ?? '',
          price: p.price ?? 0,
          enabled: !!p.enabled
        });

        this.form.get('sku')?.disable();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load product data.';
      }
    });
  }


  save(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const raw = this.form.getRawValue();

    if (this.sku) {
      const updateRequest: UpdateProductRequest = {
        name: raw.name,
        description: raw.description,
        price: raw.price
      };
      this.service.update(this.sku, updateRequest).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Product updated!';
          this.router.navigate(['/admin/products']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Error updating product.';
        }
      });
    } else {
      const createRequest: CreateProductRequest = {
        sku: raw.sku,
        name: raw.name,
        description: raw.description,
        price: raw.price
      };
      this.service.create(createRequest).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Product created!';
          this.router.navigate(['/admin/products']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Error creating product.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
