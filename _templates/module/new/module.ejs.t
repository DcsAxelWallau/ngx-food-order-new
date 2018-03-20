---
to: <%= basePath %>/<%= name %>/<%= name %>.module.ts
---
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { <%= h.inflection.pluralize(h.inflection.classify(name.replace(/-/g, '_'))) %>ListPageComponent } from './<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list-page.component';

export const routes: Routes = [
  // { path: '', component: <%= h.inflection.pluralize(h.inflection.classify(name.replace(/-/g, '_'))) %>ListPageComponent },
];

@NgModule({
  declarations: [/* <%= h.inflection.pluralize(h.inflection.classify(name.replace(/-/g, '_'))) %>ListPageComponent */],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [],
})
export class <%= h.inflection.classify(name.replace(/-/g, '_')) %>Module {}
/*
add

  { path: '<%= name %>', loadChildren: './<%= name %>/<%= name %>.module#<%= h.inflection.classify(name.replace(/-/g, '_')) %>Module' },

to src/app/app.routes.ts to activate module.
*/
