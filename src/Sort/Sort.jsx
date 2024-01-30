import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"

const Sort = ({isLowToHigh, onSort}) => {
    return (
        <div onClick={onSort}>
            <span className="sort">Sort By: Date and Time</span>
            { isLowToHigh ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
        </div>
    )
}

export default Sort;