export interface ITask {
    id: number,
    idSection: number,
    name: string
    description: string
    assignedTo: string
    creationDate: Date,
    dueDate: Date,
    status: number
}