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
        <div className="bg-gray-800 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text"/>
            </NavBar>
            <div className="p-20 w-full ">
                <table className="table-fixed w-full h-48 border-collapse">
                    <thead className="">
                        <tr className="text-white bg-black bg-opacity-20 rounded-full">
                            <th className="">Id</th>
                            <th className="">Customer</th>
                            <th className="">Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="h-min bg-white bg-opacity-10 border text-white">
                        {orders?.map(order => {
                            return (
                                <tr className="border border-opacity-20">
                                    <td className="px-5 border-r border-opacity-10">{order.paymentId}</td>
                                    <td className="border-r border-opacity-10"></td>
                                    <td className="border-r border-opacity-10">{order.products?.reduce((prev, cur) => cur.product.price, 0)}</td>
                                    <td className="text-center">{order.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}