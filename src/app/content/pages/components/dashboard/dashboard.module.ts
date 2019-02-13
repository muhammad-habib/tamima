import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { MatCardModule ,MatGridListModule} from '@angular/material';
import { CountService } from './count.serves';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		MatCardModule,MatGridListModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		])
	],
	providers: [CountService],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
