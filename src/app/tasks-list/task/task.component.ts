import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ITask } from '../task.interface';
import { ITeamMember } from '../team-member.interface';
import { IStatus } from '../status.interface';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['../tasks-list.component.sass']
})
export class TaskComponent {
    today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    editing: boolean = false;
    adding: boolean = false;
    originalTask: ITask;

    @Input() task: ITask;
    @Input() teamMembers: ITeamMember[];
    @Input() status: IStatus[];
    @Input() idSection: number;

    @Output() taskAdd: EventEmitter<ITask> = new EventEmitter<ITask>();
    @Output() taskDelete: EventEmitter<ITask> = new EventEmitter<ITask>();

    onCancelTask() {
        this.editing = false;
        if (this.task.id == null) {
            this.taskDelete.emit(this.task);
        } else {
            this.task = this.originalTask;
        }
    }

    onAddClick(taskForm: NgForm) {
        if (taskForm.valid) {
            this.taskAdd.emit(this.task);
            this.editing = false;
        };
    }

    onDeleteClick() {
        this.taskDelete.emit(this.task);
    }

    onStartEdit() {
        this.editing = !this.editing;
        this.originalTask =  Object.assign({}, this.task);
    }

    getStatusTitle(id: number) {
        let status = this.status.filter(status => { return status.id == id });
        return status[0].name || '';
    }

    getTeamMemberName(id: number) {
        let status = this.teamMembers.filter(teamMember => { return teamMember.id == id });
        return status[0].name || '';
    }

}