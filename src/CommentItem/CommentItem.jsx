import "./CommentItem.css"


const CommentItem = (props) => {

    const {
        headerValue,
        inputPlaceholder,
        inputValue,
        onInputChange,
        textAreaValue,
        onTextAreaChange,
        isEditMode,
        onSubmit,

        onReply,
        onEdit,
        onDelete,
        parentIndex,
        index
    } = props;

    if (isEditMode) {
        return (
            <div className="commentItem-wrapper">
                <h5>{headerValue}</h5>
                <input placeholder={inputPlaceholder} value={inputValue} onChange={(e) => onInputChange(e, parentIndex, index)} />
                <textarea onInput={onTextAreaChange} value={textAreaValue}></textarea>
                <button className="post-btn" onClick={() => onSubmit(parentIndex, index)}>Post</button>
            </div>
        )
    }
    return (
        <div className="commentItem-saved-mode">
            <div className="comment-values">
                <h5>{headerValue}</h5>
                <p>{inputValue}</p>
                <p>{textAreaValue}</p>
            </div>
            <div className="edit-control">
                {!Number.isInteger(parentIndex) ? <button onClick={() => onReply(parentIndex, index)}>Reply</button> : null}
                {Number.isInteger(parentIndex) ? <button onClick={() => onEdit(parentIndex, index)}>Edit</button> : null}
                <button className="delete-btn" onClick={() => onDelete(parentIndex, index)}>Delete</button>

            </div>
        </div>
    )
}

export default CommentItem;