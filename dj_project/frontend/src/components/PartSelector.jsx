import "../styles/Customized_Desktop.css"

export default function PartSelector(props){

    
    return(<div className="part-selector-container">
            <label className="part-label">{props.label}</label>
            <select className="part-selector" value={props.value} onChange={props.onChange}>
                <option value="">--select--</option>
                {props.options.map((item)=>{
                    return(<option key={item.id} value={item.id}>{item.name}</option>

                    )
                }
            )}
            </select>
            <div className="part-price"><span></span>&nbsp; {props.options.find(o=>o.id===Number(props.value))?.price??""
            }</div>
    </div>
    )
}