import CommentItem from "../CommentItem/CommentItem"

const Replies = ({ replies = [], isCommentInEditMode, name, commentText, onPostSubmit, onCommentChange, onNameChange, parentIndex, commentIndex, replyEditIndex, onEdit, onDelete }) => {
    let commentProps = {
        inputPlaceholder: "Name",
        headerValue: 'Reply',
        onInputChange: onNameChange,
        onTextAreaChange: onCommentChange,
        onSubmit: onPostSubmit,
        parentIndex: parentIndex,
    }

    if (parentIndex === commentIndex && !Number.isInteger(replyEditIndex) && !isCommentInEditMode) {
        commentProps = {
            ...commentProps,
            textAreaValue: commentText,
            inputValue: name,
        }
    }

    return (
        <>
            {
               parentIndex === commentIndex && !Number.isInteger(replyEditIndex) && !isCommentInEditMode  ? <CommentItem {...commentProps} isEditMode={true} /> : null
            }
            {
                replies.length ? replies?.map((reply, index) => {
                    const isEditMode = parentIndex === commentIndex && replyEditIndex === index && !isCommentInEditMode

                    if (isEditMode) {
                        return (
                            <CommentItem
                                {...commentProps}
                                parentIndex={parentIndex}
                                index={index}
                                inputValue={name}
                                headerValue={'Reply'}
                                textAreaValue={commentText}
                                name={reply.name}
                                onEdit={onEdit}
                                isEditMode={true}
                            />
                        )
                    }
                    return (
                        <CommentItem
                            {...commentProps}
                            parentIndex={parentIndex}
                            index={index}
                            inputValue={reply.name}
                            headerValue={reply.headerValue}
                            textAreaValue={reply.commentText}
                            dateValue={reply.date}
                            name={reply.name}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )
                }) : null
            }
        </>
    )
}

export default Replies;