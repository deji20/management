import Api from "../../api/api";
import { Component} from "react";
import ProductTable from "../../components/product/productTable/productTable";
import { ProductModel } from "../../models/productModel";
import ProductDetailsPage from "./productDetailsPage";
import CategoryListPage from "./categoryListPage";
import DialogComponent from "../../components/dialogs/baseDialog";
import ActionButton from "../../components/buttons/actionButton";

interface PageState{
    products: ProductModel[];
    dialog: any;
}

export default class ProductsPage extends Component<Object, PageState>{

    constructor(props: any){
        super(props);
        this.state = {
            dialog: null, 
            products: [] 
        }
        this.createProduct = this.createProduct.bind(this);
        this.createCategories = this.createCategories.bind(this);
    }

    //runs when component is first initialized
    componentDidMount(){
        this.updateProducts();
    }

    render(){
        return (
            <div className="bg-gray-800 min-h-screen">
                {this.state.dialog}
                <div className="px-10 flex justify-center text-gray-500">
                    <ActionButton title="Add Product" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={this.createProduct}/>
                    <ActionButton title="Add Category" className=" h-32 w-1/3" iconSrc="/api/icons/plus.svg" onClick={this.createCategories}/>
                </div>
                <input className="w-full font-bold h-10 text-white bg-blue-600 px-3" placeholder="Search" type="text" onChange={(event) => this.updateProducts("search=name="+event.target.value)}/>
                <ProductTable products={this.state.products}/>
            </div>
        );
    }

    //displays the dialog window for creating categories and setting base categories 
    createCategories(){ 
        let dialog = (
            <DialogComponent
                onClose={() => {
                    this.setState({dialog: null});
                }}

                onSubmit={(e, active) => {
                    let data = e.data as {category: string[]}
                    setTimeout(() => {
                        Api.post("/category", data.category).then(() => {
                            active(false);
                        })
                    }, 1000)
                    //this.setState({dialog: null});
                }}>
                <CategoryListPage />
            </DialogComponent>
        )
        this.setState({dialog: dialog});
    }
    //displays the dialog window for creating new products
    createProduct(product?: ProductModel){ 
        let dialog = (
            <DialogComponent 
                onClose={() => {
                    this.updateProducts();
                    this.setState({dialog: null});
                }}
                onSubmit={async (e) => {

                    if(e.data){ 
                        e.data.version.pictures = e.data.pictures;
                        delete e.data.pictures;
                        let data: any = e.data;
                        if(!Array.isArray(data.version)) data.version = [data.version];
                        Api.post("/product", data); 
                        this.updateProducts();
                        this.setState({dialog: null});
                }}
            }>
                <ProductDetailsPage product={product}/>
            </DialogComponent>
        )
        this.setState({dialog: dialog})
    }

    //get products to display
    updateProducts(search?: string){
        Api.get<ProductModel[]>("/product?"+search).then(res => {
            console.log(res);
            this.setState({products: res});
        });
    }
}