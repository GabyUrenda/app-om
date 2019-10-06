import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksListComponent } from './tasks-list.component';
import { TasksListRoutingModule } from './tasks-list-routing.module';

@NgModule({
    declarations : [
        TasksListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TasksListRoutingModule
    ]
})

export class TasksListModule {}