import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PartialsModule } from '../../../../partials/partials.module';
import { ECommerceComponent } from './e-commerce.component';
// Core => Services
import { CustomersService } from './_core/services/index';
import { OrdersService } from './_core/services/orders.service';
import { ProductRemarksService } from './_core/services/index';
import { ProductSpecificationsService } from './_core/services/index';
import { ProductsService } from './_core/services/index';
import { SpecificationsService } from './_core/services/specification.service';
// Core => Utils
import { HttpUtilsService } from './_core/utils/http-utils.service';
import { TypesUtilsService } from './_core/utils/types-utils.service';
import { LayoutUtilsService } from './_core/utils/layout-utils.service';
import { InterceptService } from './_core/utils/intercept.service';
// Shared
import { ActionNotificationComponent } from './_shared/action-natification/action-notification.component';
import { DeleteEntityDialogComponent } from './_shared/delete-entity-dialog/delete-entity-dialog.component';
import { BlockEntityDialogComponent } from './_shared/block-entity-dialog/block-entity-dialog.component';
import { FetchEntityDialogComponent } from './_shared/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from './_shared/update-status-dialog/update-status-dialog.component';
import { AlertComponent } from './_shared/alert/alert.component';
// Customers
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerEditDialogComponent } from './customers/customer-edit/customer-edit.dialog.component';
//Markets
import { MarketEditDialogComponent } from './products/product-edit/market-edit.dialog.component';
// Products
import { ProductsListComponent } from './products/products-list/products-list.component';
import { RemarksListComponent } from './products/_subs/remarks/remarks-list/remarks-list.component';
import { SpecificationsListComponent } from './products/_subs/specifications/specifications-list/specifications-list.component';
import { SpecificationEditDialogComponent } from './products/_subs/specifications/specification-edit/specification-edit-dialog.component';
// Orders
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
// Material
import { MapComponent } from '../../../../../map/map.component';
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
} from '@angular/material';
import { environment } from '../../../../../../environments/environment';
import {FirebaseService} from './_shared/firebase.service';
import {PaginationService} from './_shared/pagination.service';
import {ScrollableDirective} from './_shared/scrollable.directive';
import { AgmCoreModule } from '@agm/core';
import {LoginComponent} from '../../../auth/login/login.component';
// import {AuthGuard} from '../../../auth/auth.guard';
import { ShowOrderOnMapComponent } from './orders/show-order-on-map/show-order-on-map.component';
import {AuthNoticeComponent} from '../../../auth/auth-notice/auth-notice.component';
import {CoreModule} from '../../../../../core/core.module';
import {OrdersReportsComponent} from './reports/orders-report-list/orders-reports.component';
const routes: Routes = [
	{
		path: '',
		component: ECommerceComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				// canActivate: [AuthGuard]
			},
			{
				path: 'customers',
				component: CustomersListComponent,
				// canActivate: [AuthGuard]
			},
			{
				path: 'orders',
				component: OrdersListComponent,
				// canActivate: [AuthGuard]
			},
			{
				path: 'orders/:id',
				component: OrdersListComponent,
				// canActivate: [AuthGuard]
			},
			{
				path: 'markets',
				component: ProductsListComponent,
				// canActivate: [AuthGuard]
			},
			{
				path: 'orders-reports',
				component: OrdersReportsComponent
			},
			{
				path: 'markets/:id',
				component: ProductsListComponent,
				// canActivate: [AuthGuard]
			},
			// {
			// 	path: 'login',
			// 	component: LoginComponent,
			// },

		]
	}
];

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		AgmCoreModule.forRoot(environment.mapConfig),
		CoreModule
	],
	providers: [
		// InterceptService,
      	// {
        	// provide: HTTP_INTERCEPTORS,
       	//  	useClass: InterceptService,
        	// multi: true
      	// },
		FirebaseService,
		PaginationService,
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'm-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		CustomersService,
		OrdersService,
		ProductRemarksService,
		ProductSpecificationsService,
		ProductsService,
		SpecificationsService,
		TypesUtilsService,
		LayoutUtilsService,
	],
	entryComponents: [
		ActionNotificationComponent,
		CustomerEditDialogComponent,
		MarketEditDialogComponent,
		ShowOrderOnMapComponent,
		DeleteEntityDialogComponent,
		BlockEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		SpecificationEditDialogComponent
	],
	declarations: [
		ECommerceComponent,
		// Shared
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		BlockEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,
		// Customers
		CustomersListComponent,
		CustomerEditDialogComponent,
		MarketEditDialogComponent,
		// Orders
		OrdersListComponent,
		OrderEditComponent,
		ShowOrderOnMapComponent,
		// Products
		ProductsListComponent,
		RemarksListComponent,
		// reports
		OrdersReportsComponent,
		//////////
		SpecificationsListComponent,
		SpecificationEditDialogComponent,
		ScrollableDirective,
		MapComponent,
		// LoginComponent,
		// AuthNoticeComponent
	]
})
export class ECommerceModule { }
