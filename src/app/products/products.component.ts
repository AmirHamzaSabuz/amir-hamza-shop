import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.css' ]
})
export class ProductsComponent implements OnInit, OnDestroy {
	products: Product[] = [];
	filteredProducts: Product[] = [];
	category: string;
	cart: any;
	subscription: Subscription;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private shoppingCartService: ShoppingCartService
	) {}

	async ngOnInit() {
		this.subscription = (await this.shoppingCartService.getCart()).subscribe((cart) => (this.cart = cart));
		this.populateProducts();
	}

	private populateProducts() {
		this.productService
			.getAll()
			.pipe(
				switchMap((products: Product[]) => {
					this.products = products;
					return this.route.queryParamMap;
				})
			)
			.subscribe((params) => {
				this.category = params.get('category');
				this.applyFilter();
			});
	}

	private applyFilter() {
		this.filteredProducts = !this.category
			? this.products
			: this.products.filter((e) => e.category === this.category);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
