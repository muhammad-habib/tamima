import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild, } from '@angular/core';
import { LayoutConfigService } from './core/services/layout-config.service';
import { ClassInitService } from './core/services/class-init.service';
import { TranslationService } from './core/services/translation.service';
import * as objectPath from 'object-path';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { PageConfigService } from './core/services/page-config.service';
import { filter, first } from 'rxjs/operators';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AclService } from './core/services/acl.service';
// language list
import { locale as enLang } from './config/i18n/en';
import { locale as chLang } from './config/i18n/ch';
import { locale as esLang } from './config/i18n/es';
import { locale as jpLang } from './config/i18n/jp';
import { locale as deLang } from './config/i18n/de';
import { locale as frLang } from './config/i18n/fr';
import { AuthenticationService } from './core/auth/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagingService } from "./core/services/messaging.service";

// LIST KNOWN ISSUES
// [Violation] Added non-passive event listener; https://github.com/angular/angular/issues/8866

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[m-root]',
	templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {
	title = 'Tamima';

	@HostBinding('style') style: any;
	@HostBinding('class') classes: any = '';

	@ViewChild('splashScreen', {read: ElementRef})
	splashScreen: ElementRef;
	splashScreenImage: string;
	message;
	lol;
	constructor(
		private layoutConfigService: LayoutConfigService,
		private classInitService: ClassInitService,
		private sanitizer: DomSanitizer,
		private translationService: TranslationService,
		private router: Router,
		private pageConfigService: PageConfigService,
		private splashScreenService: SplashScreenService,
		private authenticationService: AuthenticationService,
		private afAuth:  AngularFireAuth,
		private messagingService: MessagingService		
		// private aclService: AclService
	) {
		console.log('1');
		this.getLoginStatus();
// 		await this.afAuth.authState.subscribe(user => {
//             console.log(user);
// 			if (user){
// 				this.authenticationService.loggedIn=true;
// //			  this.user = user;
// 			  localStorage.setItem('user', JSON.stringify(user));
// 			} else {
// 			  localStorage.setItem('user', null);
// 			}
// 		  })        

		// subscribe to class update event
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			// get body class array, join as string classes and pass to host binding class
			setTimeout(() => this.classes = classes.body.join(' '));
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			this.classInitService.setConfig(model);

			this.style = '';
			if (objectPath.get(model.config, 'self.layout') === 'boxed') {
				const backgroundImage = objectPath.get(model.config, 'self.background');
				if (backgroundImage) {
					this.style = this.sanitizer.bypassSecurityTrustStyle('background-image: url(' + objectPath.get(model.config, 'self.background') + ')');
				}
			}

			// splash screen image
			this.splashScreenImage = objectPath.get(model.config, 'loader.image');
		});

		// register translations
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);

		// override config by router change from pages config
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.layoutConfigService.setModel({page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config')}, true);
			});
	}

	ngOnInit(): void {
		const userId = 'user001';
		this.messagingService.requestPermission(userId)
		this.messagingService.receiveMessage()
		this.message = this.messagingService.currentMessage
	}

	async getLoginStatus(){
//		let user  = await this.afAuth.auth..authStat(res=>{ this.lol = res;});
		const user = await this.isLoggedIn()
		console.log(user);
		if(user){
			this.authenticationService.loggedIn = true;
		}
		await setTimeout(() => {
			console.log(this.lol)
		},10000 );
	}
	isLoggedIn() {
		return this.afAuth.authState.pipe(first()).toPromise();
	 }
	ngAfterViewInit(): void {
		if (this.splashScreen) {
			this.splashScreenService.init(this.splashScreen.nativeElement);
		}
	}
}
