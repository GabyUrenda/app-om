export interface ITask {
    id: number,
    idSection: number,
    name: string
    description: string
    assignedTo: number,
    creationDate: Date,
    dueDate: Date,
    status: number
}