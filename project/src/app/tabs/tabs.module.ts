import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {AddEventToDoPage} from '../components/add-event-to-do/add-event-to-do.page'
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabsPage,AddEventToDoPage, SideMenuComponent],
  entryComponents: [AddEventToDoPage]
  
})
export class TabsPageModule {}
