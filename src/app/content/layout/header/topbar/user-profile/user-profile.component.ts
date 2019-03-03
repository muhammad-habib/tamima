import { AuthenticationService } from '../../../../../core/auth/authentication.service';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MessagingService } from '../../../../../core/services/messaging.service';
import { PaginationService } from '../../../../pages/components/apps/e-commerce/_shared/pagination.service';

@Component({
	selector: 'm-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	@HostBinding('class')
	// tslint:disable-next-line:max-line-length
	classes = 'm-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light';

	@HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';

	@Input() avatar: string = './assets/app/media/img/users/user4.jpg';
	@Input() avatarBg: SafeStyle = '';

	@ViewChild('mProfileDropdown') mProfileDropdown: ElementRef;
	messages = [];
	sortField = 'name';
	reverseDir = false;
	filters: any = {};

	constructor (
		private router: Router,
		private authService: AuthenticationService,
		private sanitizer: DomSanitizer,
		private messagingService: MessagingService,		
		private ref: ChangeDetectorRef,
		public page: PaginationService
	) {
		this.messagingService.receiveMessage();
		this.messagingService.currentMessage.subscribe(message=>{
			if(message != null){
				this.messages.push(message)
				this.messages = this.messages.slice();
				this.ref.markForCheck();
				console.log(this.messages);
			}
		})
	}

	ngOnInit (): void {
		this.page.init('portal_notifications', this.sortField, 'id', { reverse: this.reverseDir, prepend: false, 'filters': this.filters });
		// if (!this.avatarBg) {
		// 	this.avatarBg = this.sanitizer.bypassSecurityTrustStyle('url(./assets/app/media/img/misc/user_profile_bg.jpg)');
		// }
	}

	public logout () {
		this.authService.logout(true);
	}
}
