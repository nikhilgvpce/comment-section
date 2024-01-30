import CommentItem from "../CommentItem/CommentItem"

const Replies = ({ replies = [], name, commentText  ,onPostSubmit, onCommentChange, onNameChange, parentIndex, commentReplyIndex }) => {
    let commentProps = {
        inputPlaceholder: "Name",
        headerValue: 'Reply',
        onInputChange: onNameChange,
        onTextAreaChange: onCommentChange,
        onSubmit: onPostSubmit,
        parentIndex: parentIndex,
        isEditMode: parentIndex === commentReplyIndex
    }

    if(parentIndex === commentReplyIndex) {
        commentProps = {
            ...commentProps,
            textAreaValue: commentText,
            inputValue: name,
        }
    }

    return (
        <>
            {
                parentIndex === commentReplyIndex ? <CommentItem {...commentProps} /> : null
            }
            {
                replies.length  ? replies?.map((reply, index) => {
                    return (
                        <CommentItem 
                        {...commentProps} 
                        parentIndex={parentIndex} 
                        index={index} 
                        inputValue={reply.name} 
                        headerValue={reply.headerValue}
                        textAreaValue={reply.commentText}
                        name={reply.name}
                    />
                    )
                }) : null
            }
        </>
    )
}

export default Replies;