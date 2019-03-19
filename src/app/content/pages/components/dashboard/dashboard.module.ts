import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { MatCardModule , MatGridListModule, MatToolbarModule} from '@angular/material';
import { CountService } from './count.serves';
import { CounterModule} from 'angular-circle-counter';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		MatToolbarModule,
		MatCardModule, MatGridListModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		]),
		CounterModule
	],
	providers: [CountService],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
