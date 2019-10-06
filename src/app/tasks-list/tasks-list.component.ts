import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ISection } from './section.interface';
import {formatDate } from '@angular/common';

@Component({
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.sass']
})

export class TasksListComponent {
    title: string = 'OpenMarket Market';
    today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    sectionList: ISection[] = [
        {
            id: 1,
            name: 'ToDo',
            creationDate: '12/05/2019',
            tasks: [
                {
                    id: 1,
                    name: 'ToDo task without begin',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 'Developers',
                    creationDate: '05/10/2019',
                    dueDate: '08/10/2019',
                    status: 0
                },
                {
                    id: 2,
                    name: 'ToDo task completed',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 'Developers',
                    creationDate: '05/10/2019',
                    dueDate: '08/10/2019',
                    status: 2
                },
                {
                    id: 2,
                    name: 'ToDo task in progress',
                    description: 'This list of task are in the stack to do.',
                    assignedTo: 'Developers',
                    creationDate: '05/10/2019',
                    dueDate: '08/10/2019',
                    status: 1
                }
            ]
        },
        {
            id: 2,
            name: 'InProgress',
            creationDate: '12/05/2019',
            tasks: [
                {
                    id: 1,
                    name: 'InProgress task',
                    description: 'This list of task are in progress.',
                    assignedTo: 'PM',
                    creationDate: '05/10/2019',
                    dueDate: '08/10/2019',
                    status: 1
                }
            ]
        },
        {
            id: 3,
            name: 'Done',
            creationDate: '12/05/2019',
            tasks: [
                {
                    id: 1,
                    name: 'Done',
                    description: 'This list of task are done.',
                    assignedTo: 'Developers',
                    creationDate: '05/10/2019',
                    dueDate: '08/10/2019',
                    status: 1
                }
            ]
        }
    ];
    taskHeaders: any = {
        name: 'Title',
        description: 'Description',
        assignedTo: 'Assigned To',
        creationDate: 'Creation Date',
        dueDate: 'Due Date',
        status: 'Status'
    };
    status: any[] = [
        { id: 0, name: 'Without starting' },
        { id: 1, name: 'In progress' },
        { id: 2, name: 'Completed' }
    ];
    newSection: string = '';
    teamMembers: any[] = [
        { id: 1, name: 'Gabriela Urenda' },
        { id: 1, name: 'Jonh Doe' },
        { id: 1, name: 'Jack Daniels' },
    ]

    getTaskCount(section: any, status: number) {
        return section.tasks.filter(task => { return task.status === status; }).length;
    }


    onShowTasks(section: any) {
        if (section.tasks.length > 0) {
            section.show = !section.show;

            if(!section.tasks[section.tasks.length -1].id) {
                this.onDeleteTask(section.tasks[section.tasks.length -1], section);
            };
        };
    }

    onDeleteSection(section: any) {
        let index = this.sectionList.findIndex(task => { return task.id === section.id; });
        this.sectionList.splice(index, 1);
    }

    onAddSection(sectionForm: NgForm) {
        if (sectionForm.valid) {
            const id = this.sectionList[this.sectionList.length - 1].id + 1;
            this.sectionList.push({ id, name: sectionForm.form.value.newSection, creationDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'), tasks: [] });
        };
    }

    onShowToAddTask(section: any) {
        section.tasks.push({ id: null, name: '', description: '', assignedTo: this.teamMembers[0].name, creationDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'), dueDate: '', status: 0 });
        section.show = true;
    }

    onAddTask(newTaskForm: NgForm, section: any) {
        console.log(newTaskForm);
        if (newTaskForm.valid) {
            section.tasks[section.tasks.length - 1].id = section.tasks[section.tasks.length - 2] ? section.tasks[section.tasks.length - 2].id + 1 : 1;
        };
    }

    onDeleteTask(taskDelete: any, section: any) {
        const index = section.tasks.findIndex(task => { return task.id === taskDelete.id });
        section.tasks.splice(index, 1);

        section.show = section.tasks.length === 0 ? false : section.show;
    }



}