import moment from "moment";
import { useEffect, useState } from "react";
import Api from "../../api/api";
import ActionButton from "../../components/buttons/actionButton";
import NavBar from "../../components/navigation/navBar";
import { Order } from "../../models/order";

export default function OrdersPage(){
    const [orders, setOrders] = useState<Order[]>([]);

    //get products to display
    const updateOrders = (search?: string) => {
        Api.get<Order[]>(`/order?${search}`).then(res => {
            setOrders(res);
        }).catch(err => console.log(err));
    }

    //runs when component is first initialized
    useEffect(() => {
        updateOrders()
    }, [])
    return (
        <div className="bg-gray-700 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text"/>
            </NavBar>
            <div className="rounded-lg min-h-[75%] pt-10 flex justify-center">
                <div className="shadow-2xl w-2/3">
                    <table className="bg-blue-500 w-full rounded-lg border-collapse">
                        <thead className="h-12">
                            <tr className="text-white">
                                <th className="bg-black bg-opacity-70 border-r border-opacity-10 rounded-tl-lg">Id</th>
                                <th className="bg-black bg-opacity-70 border-r border-opacity-10">Customer</th>
                                <th className="bg-black bg-opacity-70 border-r border-opacity-10">Address</th>
                                <th className="bg-black bg-opacity-70 border-r border-opacity-10">Created</th>
                                <th className="bg-black bg-opacity-70  border-r border-opacity-10">Amount</th>
                                <th className="bg-black bg-opacity-70 rounded-tr-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody className="h-min text-white text-sm tracking-wider">
                            {orders?.map((order, i) => {
                                return (
                                    <tr className="h-10 text-center odd:bg-black odd:bg-opacity-30 hover:bg-black hover:shadow-inner cursor-pointer hover:bg-opacity-50">
                                        <td className="px-5 border-r border-opacity-10">{order.paymentId}</td>
                                        <td className="border-r border-opacity-10">{order.customer?.privatePerson.firstName} {order.customer?.privatePerson.lastName}</td>
                                        <td className="border-r border-opacity-10">{order.customer?.shippingAddress?.addressLine1}</td>
                                        <td className="border-r border-opacity-10">{moment(order.created).format("DD-MM-yy")}</td>
                                        <td className={"border-r border-opacity-10 text-center "}>{order.products?.reduce((prev, cur) => cur.product.price, 0)}</td>
                                        <td className={"text-center"}>{order.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}