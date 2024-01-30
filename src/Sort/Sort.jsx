import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import "./Sort.css";

const Sort = ({isLowToHigh, onSort}) => {
    return (
        <div className="sort" onClick={onSort}>
            <span>Sort By: Date and Time</span>
            { isLowToHigh ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
        </div>
    )
}

export default Sort;