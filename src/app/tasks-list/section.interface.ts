import { ITask } from './task.interface';

export interface ISection  {
    id: number,
    name: string,
    creationDate: string,
    tasks: ITask[]
}