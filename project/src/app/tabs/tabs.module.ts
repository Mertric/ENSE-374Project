import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {AddEventToDoPage} from '../components/add-event-to-do/add-event-to-do.page'
import { TabsPageRoutingModule } from './tabs-routing.module';
import {NgCalendarModule} from 'ionic2-calendar'; 
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,NgCalendarModule
  ],
  declarations: [TabsPage,AddEventToDoPage],
  entryComponents: [AddEventToDoPage]
  
})
export class TabsPageModule {}
