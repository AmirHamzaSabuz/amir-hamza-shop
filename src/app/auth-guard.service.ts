import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate() {
		return this.auth.user$.pipe(
			map((user) => {
				if (user) {
					return true;
				}
				this.router.navigate([ '/login' ]);
				return false;
			})
		);
	}
}
