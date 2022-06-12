import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/api";
import NavBar from "../../components/navigation/navBar";
import HeaderField from "../../components/table/headerField";
import { Filter, FilterField } from "../../models/filter";
import { Order } from "../../models/order";

export default function OrdersPage(){
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterFields, setFilter] = useState<FilterField[]>([]);
    const filter = new Filter(filterFields);

    //get products to display
    const updateOrders = (search?: string) => {
        Api.get<Order[]>(`/order?${search}`).then(res => {
            setOrders(res);
        }).catch(err => console.log(err));
    }

    //runs when component is first initialized
    useEffect(() => {
        updateOrders()
    }, []);

    const nav = useNavigate()

    return (
        <div className="bg-gray-700 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text"/>
            </NavBar>
            <div className="rounded-lg min-h-[75%] pt-10 flex justify-center">
                <div className="shadow-2xl w-2/3">
                    <table className="bg-blue-500 w-full rounded-lg border-collapse">
                        <thead className="h-12">
                            <tr className="text-white shadow-2xl">
                                <HeaderField name="Id" className="rounded-tl-lg" filterName="paymentId" onChange={(filterField) => {
                                    filter.addField(filterField); 
                                    setFilter(filter.getFields())}
                                }/>
                                <HeaderField name="Customer"/>
                                <HeaderField name="Address"/>
                                <HeaderField name="Created"/>
                                <HeaderField name="Amount"/>
                                <HeaderField name="Status" className="rounded-tr-lg"/>
                            </tr>
                        </thead>
                        <tbody className="h-min text-white text-sm tracking-wider">
                            {orders.filter((o) => filter.every<Order>(o)).map((order, i) => {
                                return (
                                    <tr key={i}
                                    onClick={() =>  nav("./"+order.id)}  
                                    className="h-10 text-center odd:bg-black odd:bg-opacity-30 hover:bg-black hover:shadow-inner cursor-pointer hover:bg-opacity-50">
                                        <td className="px-5 border-r border-opacity-10">{order.id}</td>
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