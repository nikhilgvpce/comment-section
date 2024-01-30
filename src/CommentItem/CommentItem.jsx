import "./CommentItem.css"


const CommentItem = ({inputPlaceholder, onInputChange, inputValue, onTextAreaChange, textAreaValue}) => {
    return (
        <div className="commentItem-wrapper">
            <p>Comment</p>
            <input placeholder={inputPlaceholder} onChange={onInputChange} value={inputValue} />
            <textarea onChange={onTextAreaChange}>{textAreaValue}</textarea>
            <button className="post-btn">Post</button>
        </div>
    )
}

export default CommentItem;