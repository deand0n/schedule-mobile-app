import { NgModule } from '@angular/core';
import { ExploreContainerComponent } from './explore-container.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [

    SharedModule,
  ],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
