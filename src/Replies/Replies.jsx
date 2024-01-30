import CommentItem from "../CommentItem/CommentItem"

const Replies = ({ replies = [], name, commentText  ,onPostSubmit, onCommentChange, onNameChange, parentIndex, commentReplyIndex }) => {
    const commentProps = {
        inputPlaceholder: "Name",
        textAreaValue: commentText,
        headerValue: 'Reply',
        onInputChange: onNameChange,
        inputValue: name,
        onTextAreaChange: onCommentChange,
        onSubmit: onPostSubmit,
        parentIndex,
        isEditMode: parentIndex === commentReplyIndex
    }

    return (
        <>
            {
                parentIndex === commentReplyIndex ? <CommentItem {...commentProps} /> : null
            }
            {
                replies.length  ? replies?.map((reply, index) => {
                    return (
                        <CommentItem {...commentProps} inputValue={reply.inputValue} headerValue={reply.headerValue} />
                    )
                }) : null
            }
        </>
    )
}

export default Replies;