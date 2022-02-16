export interface Ticket{
    _id?: string,
    email: string,
    name: string
    type: string,
    status: TicketStatus,
    subject: string,
    message: string
}

export enum TicketStatus{
    New,
    Active,
    Paused,
    Completed
}
