
export default function PartSelector(props){

    
    return(<div className="part-selector">
            <label>{props.label}</label>
            <select value={props.value} onChange={props.onChange}>
                <option value="">--select--</option>
                {props.options.map((item)=>{
                    return(<option key={item.id} value={item.id}>{item.name}</option>

                    )
                }
            )}
            </select>
            <div className="price"><span>AED </span>&nbsp; {(props.options.find(o=>o.id===Number(props.value))?.price: "")
            }</div>
    </div>
    )
}