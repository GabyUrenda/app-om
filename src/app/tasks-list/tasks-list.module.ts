import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TasksListComponent } from './tasks-list.component';
import { TasksListRoutingModule } from './tasks-list-routing.module';
import { TaskComponent } from './task/task.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations : [
        TaskComponent,
        TasksListComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        TasksListRoutingModule,
        SharedModule
    ]
})

export class TasksListModule {}