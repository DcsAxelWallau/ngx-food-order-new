import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainNavigationComponent } from './main-navigagtion/main-navigation.component';

@NgModule({
  declarations: [MainNavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavigationComponent],
})
export class ComponentsModule {}
