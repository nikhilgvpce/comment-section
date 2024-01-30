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
            <div className={`${Number.isInteger(parentIndex) ? 'replyItem-wrapper' : 'commentItem-wrapper'}`}>
                <p className="header-value">{headerValue}</p>
                <input placeholder={inputPlaceholder} value={inputValue} onChange={(e) => onInputChange(e, parentIndex, index)} />
                <textarea onInput={onTextAreaChange} value={textAreaValue}></textarea>
                <button className="post-btn" onClick={() => onSubmit(parentIndex, index)}>Post</button>
            </div>
        )
    }
    return (
        <div className={`${ Number.isInteger(parentIndex) ? 'reply-saved-mode': 'comment-saved-mode'}`}>
            <div className="comment-values">
                <p className="input-value">{inputValue}</p>
                <p>{textAreaValue}</p>
            </div>
            <div className="edit-controls">
                {!Number.isInteger(parentIndex) ? <button onClick={() => onReply(parentIndex, index)}>Reply</button> : null}
                {<button onClick={() => onEdit(parentIndex, index)}>Edit</button>}
                { Number.isInteger(parentIndex) ? <button className="delete-btn" onClick={() => onDelete(parentIndex, index)}>Delete</button> : null}
            </div>
        </div>
    )
}

export default CommentItem;