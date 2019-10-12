import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
	constructor(private auth: AuthService, private userService: UserService) {}

	canActivate(): Observable<boolean> {
		return this.auth.user$
			.pipe(switchMap((user) => this.userService.get(user.uid).valueChanges()))
			.pipe(map((appUser) => appUser.isAdmin));
	}
}
