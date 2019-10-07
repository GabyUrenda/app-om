import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ISection } from './section.interface';
import { IStatus } from './status.interface';
import { ITeamMember } from './team-member.interface';
import { ITask } from './task.interface';
import { style, state, animate, transition, trigger } from '@angular/animations';


@Component({
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.sass'],
    animations: [
        trigger('enterLeaveAnimation', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('1s ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ height: '*', opacity: 1 }),
                animate('1s ease-in', style({ height: 0, opacity: 0 }))
            ])
        ])
    ]
})

export class TasksListComponent {
    title: string = 'OpenMarket Market';
    //today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    today: Date = new Date();
    newSection: string = '';

    sectionList: ISection[] = [
        {
            id: 1,
            name: 'ToDo',
            creationDate: new Date(),
            tasks: [
                {
                    id: 1,
                    idSection: 1,
                    name: 'ToDo task without begin',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 1,
                    creationDate: new Date(),
                    dueDate: new Date(),
                    status: 0
                },
                {
                    id: 2,
                    idSection: 1,
                    name: 'ToDo task completed',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 2,
                    creationDate: new Date(),
                    dueDate: new Date(),
                    status: 2
                },
                {
                    id: 2,
                    idSection: 1,
                    name: 'ToDo task in progress',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 2,
                    creationDate: new Date(),
                    dueDate: new Date(),
                    status: 1
                }
            ]
        },
        {
            id: 2,
            name: 'InProgress',
            creationDate: new Date(),
            tasks: [
                {
                    id: 1,
                    idSection: 2,
                    name: 'InProgress task',
                    description: 'This list of task are in progress.',
                    assignedTo: 3,
                    creationDate: new Date(),
                    dueDate: new Date(),
                    status: 1
                }
            ]
        },
        {
            id: 3,
            name: 'Done',
            creationDate: new Date(),
            tasks: [
                {
                    id: 1,
                    idSection: 3,
                    name: 'Done',
                    description: 'This list of task are done.',
                    assignedTo: 4,
                    creationDate: new Date(),
                    dueDate: new Date(),
                    status: 1
                }
            ]
        }
    ];
    status: IStatus[] = [
        { id: 0, name: 'Without starting' },
        { id: 1, name: 'In progress' },
        { id: 2, name: 'Completed' }
    ];

    teamMembers: ITeamMember[] = [
        { id: 1, name: 'Gabriela Urenda' },
        { id: 2, name: 'Billy Joe' },
        { id: 3, name: 'Debbie Harry' },
        { id: 4, name: 'Davey Havok' }
    ]

    modal = {
        title: 'Delete',
        body: 'Are you sure you want to delete this item?',
        okBtn: 'Delete',
        cancelBtn: 'Cancel',
        show: false,
        params: {}
    }


    getTaskCount(section: any, status: number) {
        return section.tasks.filter(task => { return task.status === status; }).length;
    }

    onShowTasks(section: any) {
        if (section.tasks.length > 0) {
            section.show = !section.show;

            //Clean all the task without id
            let sectionsToDelete = 0;
            for (let index = section.tasks.length - 1; index >= 0; index--) {
                if (section.tasks[index].id === null) {
                    sectionsToDelete++;
                } else {
                    section.tasks.splice(index + 1, sectionsToDelete);
                    index = -1;
                };
            }
        };
    }

    onDeleteSectionModal(section: any) {
        this.modal.title = `Delete section "${section.name}"`
        this.modal.params = { action: 'deleteSection', section }
        this.modal.show = true;
    }

    onDeleteSection(section: any) {
        let index = this.sectionList.findIndex(task => { return task.id === section.id; });
        this.sectionList.splice(index, 1);
    }

    onAddSection(sectionForm: NgForm) {
        if (sectionForm.valid) {
            const id = this.sectionList[this.sectionList.length - 1].id + 1;
            this.sectionList.push({ id, name: sectionForm.form.value.newSection, creationDate: this.today, tasks: [] });
        };
    }

    onShowToAddTask(section: any) {
        section.tasks.push({ id: null, idSection: section.id, name: '', description: '', assignedTo: this.teamMembers[0].id, creationDate: this.today, dueDate: this.today, status: 0 });
        section.show = true;
    }

    onAddTask(taskAdd: ITask) {
        const section = this.sectionList.find(section => { return section.id === taskAdd.idSection });
        section.tasks[section.tasks.length - 1].id = section.tasks[section.tasks.length - 2] ? section.tasks[section.tasks.length - 2].id + 1 : 1;

    }

    onDeleteTaskModal(taskDelete: ITask) {
        if (taskDelete.id === null) {
            this.onDeleteTask(taskDelete);
            return;
        };

        this.modal.title = `Delete task "${taskDelete.name}"`;
        this.modal.params = { action: 'deleteTask', task: taskDelete };
        this.modal.show = true;

    }

    onDeleteTask(taskDelete: ITask) {
        const section = this.sectionList.find(section => { return section.id === taskDelete.idSection });
        const index = section.tasks.findIndex(task => { return task.id === taskDelete.id });
        section.tasks.splice(index, 1);
    }

    onModalContinue(params: any) {
        this.modal.show = false;
        if (params.action === 'deleteSection') {
            this.onDeleteSection(params.section);
        } else if (params.action === 'deleteTask') {
            this.onDeleteTask(params.task);
        };
    }

    onModalCancel() {
        this.modal.show = false;
    }

}