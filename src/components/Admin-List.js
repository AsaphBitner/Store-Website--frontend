import itemsList from "../Products-For-Sale";
import _AddButton from "./Admin-Add-Button";
import _EditButton from "./Admin-List-Edit-Button"
import _DeleteButton from "./Admin-List-Delete-Button"

export default function AdminItemsList(){
    const items = itemsList()
    return(
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
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{`$${item.price}`}</td>
                            <td>
                                <_DeleteButton />
                                <_EditButton />
                            </td>
                        </tr>
                )})}
                </tbody>
            </table>
        </div>
    )
}




