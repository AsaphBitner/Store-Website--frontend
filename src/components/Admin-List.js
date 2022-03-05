// import itemsList from "../Products-For-Sale";
import _AddButton from "./Admin-Add-Button";
import _EditButton from "./Admin-List-Edit-Button"
import {DeleteButton} from "./Admin-List-Delete-Button"
import { useSelector } from "react-redux"

export default function AdminItemsList(){
    const state = useSelector(state => state)
    const items = state.products
    // console.log(state)
    // console.log(items)

    if (!items) {return(
        <>
        </>
    )}
    else return(
        <div className="admin-items-list">
            <table>
                <tbody>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            option
                        </th>
                    </tr>
                {items.map((item)=>{
                    return(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{`$${item.price}`}</td>
                            <td>
                                <DeleteButton product={item} />
                                <_EditButton product={item} />
                            </td>
                        </tr>
                )})}
                </tbody>
            </table>
        </div>
    )
}




