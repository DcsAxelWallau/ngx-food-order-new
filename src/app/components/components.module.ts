import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainNavigationComponent } from './main-navigagtion/main-navigation.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [MainNavigationComponent, ErrorBoxComponent, LoadingIndicatorComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavigationComponent, ErrorBoxComponent, LoadingIndicatorComponent],
})
export class ComponentsModule {}
