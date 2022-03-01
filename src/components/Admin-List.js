import itemsList from "../Products-For-Sale";
import _AddButton from "./Admin-Add-Button";
import _EditButton from "./Admin-List-Edit-Button"
import _DeleteButton from "./Admin-List-Delete-Button"

export default function AdminItemsList(){
    const items = itemsList()
    return(
        <div className="admin-items-list">
            <table>
                <th>
                    Title
                </th>
                <th>
                    Price
                </th>
                <th>
                    option
                </th>
                <tbody>
                {items.map((item)=>{
                    return(
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                {_AddButton}
                                {_EditButton}
                            </td>
                        </tr>
                )})}
                </tbody>
            </table>
        </div>
    )
}




