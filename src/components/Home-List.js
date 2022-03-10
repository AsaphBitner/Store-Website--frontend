// import itemsList from "../Products-For-Sale";
import { AddToCartButton } from "./Home-Add-To-Cart-Button";
import { useSelector } from "react-redux"

export default function HomeItemsList(){
    const state = useSelector(state => state)
    const items = state.products
    // console.log(state)
    // console.log(items)

    if (!items) {return(
        <>
        </>
    )}
    else return(
        <div className="home-items-list">
          
                {items.map((item)=>{
                    return(
                        <div className="home-list-card" key={item._id}>
                            <div className="home-list-card-part image-container">
                                <img src={item.image}></img>                                
                            </div>
                            <div className="home-list-card-part">{item.name}</div>
                            <div className="home-list-card-part">{`${item.description}`}</div>
                            <div className="home-list-card-part">{`$${item.price}`}</div>
                            <div>
                                <AddToCartButton product={item} />    
                            </div>
                        </div>
                )})}
        </div>
    )
}




