import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				loadChildren: './components/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'mail',
				loadChildren: './components/apps/mail/mail.module#MailModule'
			},
			{
				path: 'ecommerce',
				loadChildren: './components/apps/e-commerce/e-commerce.module#ECommerceModule'
			},
			{
				path: 'ngbootstrap',
				loadChildren: './components/ngbootstrap/ngbootstrap.module#NgbootstrapModule'
			},
			{
				path: 'material',
				loadChildren: './components/material/material.module#MaterialModule'
			},
			{
				path: 'metronic',
				loadChildren: './components/metronic/metronic.module#MetronicModule'
			},
			{
				path: 'user-management',
				loadChildren: './components/user-management/user-management.module#UserManagementModule'
			},
			{
				path: 'audit-log',
				loadChildren: './components/apps/audit-log/audit-log.module#AuditLogModule'
			},
			{
				path: 'builder',
				loadChildren: './builder/builder.module#BuilderModule'
			},
			{
				path: 'header/actions',
				component: ActionComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			}
		]
	},
	{
		path: 'login',
		loadChildren: './auth/auth.module#AuthModule',
	},
	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}
