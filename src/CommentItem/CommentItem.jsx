import "./CommentItem.css"


const CommentItem = (props) => {

    const {
        headerValue,
        inputPlaceholder,
        onInputChange,
        inputValue,
        onTextAreaChange,
        textAreaValue,
        type,
        isEditMode,
        onSubmit,

        onCommentEdit,
        onCommentDelete,
        index,
    } = props;
    return (
        <div className="commentItem-wrapper">
            <h5>{headerValue}</h5>
            <input placeholder={inputPlaceholder} onChange={onInputChange} value={inputValue} />
            <textarea onChange={onTextAreaChange}>{textAreaValue}</textarea>
            <button className="post-btn">Post</button>
            <div children="edit-controls">
            <button>Reply</button>
                <button>Edit</button>
            </div>
            <button>Delete</button>
        </div>
    )
}

export default CommentItem;