import { ITask } from './task.interface';

export interface ISection  {
    id: number,
    name: string,
    creationDate?: Date,
    show?: boolean,
    tasks: ITask[]
}