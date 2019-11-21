import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'add-event-to-do', loadChildren: './components/add-event-to-do/add-event-to-do.module#AddEventToDoPageModule' },  { path: 'details', loadChildren: './components/details/details.module#DetailsPageModule' }

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),FormsModule,ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
