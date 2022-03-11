import ActionButton from "../../components/buttons/actionButton";
import NavBar from "../../components/navigation/navBar";

export default function OrdersPage(){
    return (
        <div className="bg-gray-800 min-h-screen">
            <NavBar back="/">
                <input className="flex flex-grow font-bold h-full text-white bg-blue-900 bg-opacity-10 w-full px-3 focus:bg-opacity-100" placeholder="Search" type="text"/>
            </NavBar>
        </div>
    );
}