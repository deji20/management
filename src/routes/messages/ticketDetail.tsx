import { useState } from "react"
import { useEffect } from "react"
import api from "../../api/api"
import { Ticket } from "../../models/ticket"

export default function TicketDetails(props: {id: string}){
    const [ticket, setTicket] = useState<Ticket | undefined>()
    useEffect(() => {
        api.get<Ticket>(`/ticket/${props.id}`)
            .then((res) => {
                setTicket(res);
            })
    }, []);

    return (
        <div className="w-full h-full bg-gray-800 rounded-xl text-white flex flex-col place-content-between">
            <div className="w-full text-center p-5 rounded-t-xl bg-gray-900 text-white">
                <p className="text-3xl font-thin">{ticket?.subject}</p>
            </div>
            <div className="p-5">
                <div className="p-5 flex justify-around rounded-lg flex-col md:flex-row bg-gray-700 shadow-2xl">
                    <div>
                        <p className="text-xl font-extralight">Name:</p>
                        <p>{ticket?.name}</p>
                    </div>
                    <div>
                        <p className="text-xl font-extralight">Email:</p>
                        <p>{ticket?.email}</p>
                    </div>
                </div>
            </div>
            <div className="p-5 align-bottom flex flex-grow flex-col">
                <p className="text-xl font-extralight p-2">Text</p>
                <div className="w-full text-left flex flex-grow shadow-2xl p-5 rounded-xl bg-gray-300 text-black">
                    <p className="">{ticket?.message}</p>
                </div>
            </div>
        </div>
    )

}