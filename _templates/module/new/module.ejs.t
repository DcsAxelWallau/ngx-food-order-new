---
to: <%= basePath %>/<%= name %>/<%= name %>.module.ts
---
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { <%= h.inflection.pluralize(Name) %>ListPageComponent } from './<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list-page.component';

export const routes: Routes = [
  // { path: '', component: <%= h.inflection.pluralize(Name) %>ListPageComponent },
];

@NgModule({
  declarations: [/* <%= h.inflection.pluralize(Name) %>ListPageComponent */],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [],
})
export class <%= Name %>Module {}
/*
add

  { path: '<%= name %>', loadChildren: './<%= name %>/<%= name %>.module#<%= Name %>Module' },

to src/app/app.routes.ts to activate module.
*/
