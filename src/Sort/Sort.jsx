import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import "./Sort.css";
import { useEffect, useState } from "react";
import { sort } from "../../utils";

const Sort = ({ comments, dispatch }) => {
    const [isLowToHigh, setSort] = useState(true);

    useEffect(() => {
        if (!comments.length) return;
        sort(comments, true)
        comments.forEach((comment) => {
            if (comment.replies) {
                sort(comment.replies, true)
            }
        })
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                comments
            }
        })
    }, [])
    const handleClick = () => {
        const sortingOrder = !isLowToHigh;
        setSort(!isLowToHigh);
        sort(comments, sortingOrder)
        comments.forEach((comment) => {
            if (comment.replies) {
                sort(comment.replies, sortingOrder)
            }
        })
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                comments
            }
        })
    }

    return (
        <div className="sort" onClick={handleClick}>
            <span>Sort By: Date and Time</span>
            {isLowToHigh ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
        </div>
    )
}

export default Sort;