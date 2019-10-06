export interface ITask {
    id: number,
    name: string
    description: string
    assignedTo: string
    creationDate: string,
    dueDate: string
    status: number
}