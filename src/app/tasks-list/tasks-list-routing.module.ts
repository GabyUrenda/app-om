import { NgModule } from '@angular/core';
import { TasksListComponent } from './tasks-list.component';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: 'tasks-list', component: TasksListComponent}   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksListRoutingModule { }