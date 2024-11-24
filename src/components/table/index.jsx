import { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import ButtonIcon from "../elements/buttonIcon";
import css from "./index.module.css";
import { Tooltip } from "react-tippy";
import { formatDate } from "../../utils/helpers";
import { BsFillCircleFill } from "react-icons/bs";

const sortTypes = {
    number: (a,b) => Number(a) - Number(b),
    string: (a,b) => a.localeCompare(b),
    date: (a,b) => new Date(a) - new Date(b),
    bool: (a,b) => Boolean(a) - Boolean(b),
};

const formatTypes = {
    number: (value) => value,
    string: (value) => value,
    date: (value) => formatDate(new Date(value)),
    bool: (value) => value ? <BsFillCircleFill style={{color: "green"}}/>: <BsFillCircleFill style={{color: "red"}}/>,
};

export default function Table({ collumns, items, types, actions, format }) {
	const [sortedItems, setSortedItems] = useState(items);
	const [orderBy, setOrderBy] = useState();
    const [ascOrder, setAscOrder] = useState(true);

	const keys = Object.keys(collumns);

	const handleSort = (key) => {
        const sameKey = orderBy === key
        if (sameKey) {
            setAscOrder(state => !state)
            const reversedItems = sortedItems.slice().reverse()
            setSortedItems(reversedItems)
        } else {
            setOrderBy(key)
            setAscOrder(true)

            const sortFunction = sortTypes[types[key]];
            setSortedItems(state => state.sort((a, b) => {
                const first = a[key];
                const second = b[key];
                return sortFunction(first, second);
            }))
		}
    }

    const formatItem = (item, key) => {
        const value = item[key];
        const formatFunction = (format && format[key]) ? format[key] : formatTypes[types[key]];
        return formatFunction(value)
    };


	return (
		<table className={css.table}>
			<thead>
				<tr>
					{Object.entries(collumns).map(([key, value]) => (
						<th key={key}>
                            <span onClick={() => handleSort(key)}>
							{value}{" "}
							{orderBy === key ? ascOrder? <FaSortUp style={{color: "var(--mwText4)"}}/> : <FaSortDown style={{color: "var(--mwText4)"}} /> :  <FaSort style={{color: "lightgray"}}/>}
                            </span>
						</th>
					))}
					{actions && <th></th>}
				</tr>
			</thead>
			<tbody>
				{sortedItems?.map((item) => (
					<tr key={item.id}>
						{keys.map((key) => (
							<td key={key}>{formatItem(item, key)}</td>
						))}
						{actions && (
							<td>
								{actions
									.filter((action) => (action.show ? action.show(item) : true))
									.map((action) => (
										<Tooltip key={action.name} title={action.name} position="bottom">
											<ButtonIcon key={action.name} onClick={action.onClick}>
												{action.icon}
											</ButtonIcon>
										</Tooltip>
									))}
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
