import React from "react";
// import { dataService } from "../../services/data-service";
import {SingleCell} from './SingleCell.js'

export default function SingleRow(props) {

    return (
        <tr className="single-row">
            {props.row.map(cell => <SingleCell cell={{cell}} key={cell._id} />)}
        </tr>
    )
}



