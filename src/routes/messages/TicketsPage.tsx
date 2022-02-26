import { ReactElement, useEffect, useState } from "react"
import api from "../../api/api"
import DialogComponent from "../../components/dialogs/baseDialog"
import Image from "../../components/Image"
import { Ticket } from "../../models/ticket"
import TicketDetails from "./ticketDetail"

export default function TicketsPage(){
    const [tickets, setTickets] = useState<Ticket[]>()
    const [filter, setFilter] = useState<string>()
    const [dialog, openDialog] = useState<ReactElement | null>();

    const filters = tickets?.flatMap((ticket) => ticket.type);
    console.log(filters);

    useEffect(() => {
        api.get<Ticket[]>("/ticket").then((res) => {
            setTickets(res)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const openDetail = (id: string) => {
        console.log(id);
        openDialog(
            <DialogComponent 
                onClose={() => openDialog(null)}>
                <TicketDetails id={id}/>
            </DialogComponent>
        )
    }

    return (
        <div className="bg-gray-800 min-h-screen flex place-items-center justify-center">
            {dialog}
            <div className="w-2/3 rounded-xl max-h-[80vh] overflow-y-auto shadow-xl bg-gray-700">
                <table className="w-full relative">
                    <tr className="text-lg bg-gray-900 rounded-full text-white table-fixed">
                        <td className="p-3 w-1/6" onClick={() => filters && setFilter(filters.pop())}>Type{filter && <span className="text-sm">: {filter}</span>}</td>
                        <td>Subject</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                    {
                    tickets?.filter(ticket => !filter || ticket.type === filter).map((ticket, i) => {
                        return (
                            <tr onClick={(event) => {event.preventDefault(); ticket._id && openDetail(ticket._id)}} className={`text-white  border-b last:rounded-xl last:border-none hover:bg-gray-600 cursor-pointer`}>
                                <td className="p-3">
                                    {ticket.type}
                                </td>
                                <td>
                                    {ticket.subject}
                                </td>
                                <td>
                                    {ticket.name}
                                </td>
                                <td>
                                    {ticket.email}
                                </td>
                                <td className="w-min">
                                    {ticket.status}
                                </td>
                                <td className="w-16 px-4">
                                    <Image onClick={(event) => {
                                        event.preventDefault();
                                        ticket._id && api.delete("/ticket", ticket._id)
                                            .then(() => {
                                                api.get<Ticket[]>("/ticket").then((res) => {
                                                    setTickets(res)
                                                }).catch(err => {
                                                    console.log(err);
                                                })
                                            })
                                    }} pictures={["/api/icons/trash.svg"]}/>
                                </td>
                            </tr>
                        )
                    })
                }
                </table>
            </div>
        </div>
    )
}