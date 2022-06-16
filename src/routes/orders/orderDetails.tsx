import { linkSync } from "fs";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import api from "../../api/api";
import Image from "../../components/Image";
import NavBar from "../../components/navigation/navBar";
import { Order } from "../../models/order";

export default function OrderDetails(){
    //get id from url parameter
    const { id } = useParams();
    const nav = useNavigate();
    //try to pull product from database
    const {data: order, error } =  useSWR<Order>(`/order/${id}`, key => api.get<Order>(key));

    if(!order && !error) return <p>loading</p> 
    return (
        <div className="w-screen min-h-screen bg-gray-700 ">
            <NavBar back="/orders"></NavBar>
            <div className="m-auto flex flex-grow pt-10">
                <div className=" pt-0 m-auto w-2/3 h-full  rounded-b-lg bg-white shadow-2xl bg-opacity-80 text-white">
                    <div className="bg-black flex flex-row justify-evenly gap-2 shadow-lg p-4 bg-opacity-30">
                        <div className="text-white text-xl my-auto">
                            <h1>Order {order?.id}</h1>
                        </div>
                        <div className="text-white text-opacity-40">
                            <p>Payment Id</p>
                            <p> {order?.paymentId} </p>
                        </div>
                    </div>
                    <div className="flex w-full p-5 justify-between flex-row gap-4">
                        <div className="rounded-xl bg-black bg-opacity-20">
                            <h3 className="text-2xl m-auto py-2 px-2">Produkter</h3>
                            <table>
                                <thead className="bg-black bg-opacity-20 text-xl text-gray-800">
                                    <tr>
                                        <th>Id</th>
                                        <th>Mængde</th>
                                        <th>Navn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-black bg-opacity-0 odd:bg-opacity-10 hover:bg-opacity-20 transition-all duration-100">
                                    {order?.products?.map((line) => (
                                        <tr 
                                        className="child:m-auto child:text-center cursor-pointer"
                                        onClick={() => nav(`/products/${line.product.id}`)}>
                                            <td className="px-2">{line.product.id}</td>
                                            <td className="px-2">{line.amount}</td>
                                            <td className="px-2">{line.product.name}</td>
                                            <td><Image className="w-20" pictures={line.product.version[0].pictures}/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-black bg-opacity-20 rounded-lg">
                            <h3 className="text-2xl py-2 px-2">Addresse</h3>
                            <div className="grid py-2 gap-2 child:shadow-2xl child:rounded-lg child:bg-black child:p-2 child:bg-opacity-20">
                                <div className="flex flex-row">
                                    <b className="px-2">Addresse</b>
                                    <p>{order?.customer?.shippingAddress.addressLine1}</p>
                                </div>

                                <div className="flex flex-row">
                                    <b className="px-2">By: </b>
                                    <p>{order?.customer?.shippingAddress.city} {order?.customer?.shippingAddress.postalCode} {order?.customer?.shippingAddress.country}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black bg-opacity-20 rounded-lg">
                            <h3 className="text-2xl px-2">Kunde</h3>
                            <div className="grid py-2 gap-2 child:shadow-2xl child:rounded-lg child:bg-black child:p-2 child:bg-opacity-20">
                                <div className="flex flex-row">
                                    <b className="px-2">Navn</b>
                                    <p>{order?.customer?.privatePerson.firstName} {order?.customer?.privatePerson.lastName}</p>
                                </div>

                                <div className="flex flex-row">
                                    <b className="px-2">Email</b>
                                    <p>{order?.customer?.email}</p>
                                </div>

                                <div className="flex flex-row">
                                    <b className="px-2">Telefon</b>
                                    <p>{order?.customer?.phone.prefix}  {order?.customer?.phone.number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black bg-opacity-50 px-10">
                       <p className="text-xl">Status: <b className="">{order?.status}</b></p>
                    </div>
                    <div className="bg-black bg-opacity-20 p-5 flex gap-4 justify-center">
                        <div>
                            <button className="m-auto shadow-2xl p-5 bg-green-500 bg-opacity-70">
                                <p>Ordre er afsendt</p>
                            </button>
                        </div>

                        <div>
                            <button className="m-auto shadow-2xl p-5 bg-red-500 bg-opacity-70">
                                Fortryd Køb
                            </button>
                        </div>

                        <button 
                            className=" w-10 m-auto bg-opacity-50 hover:bg-opacity-100 rounded transition-all duration-300" 
                            onClick={async () => {
                                if(order?.id != null){
                                    let result = await api.delete("/order", order?.id)
                                    nav("/orders")
                                }}
                            }>
                            <Image className="flex p-1" pictures={["/api/icons/trash.svg"]}/>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}