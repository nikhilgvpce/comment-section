import CommentItem from "../CommentItem/CommentItem"

const Replies = ({ replies = [], onPostSubmit, onCommentChange, onNameChange }) => {
    const commentProps = {
        inputPlaceholder: "Name",
        onInputChange: onNameChange,
        inputValue: '',
        onTextAreaChange: onCommentChange,
        textAreaValue: 'Reply',
        onSubmit: onPostSubmit,
    }

    return (
        <>
            {
                replies.map((reply, index) => {
                    if (index == 0) {
                        return (
                            <CommentItem {...commentProps} />
                        )
                    }
                    return (
                        <CommentItem {...reply}/>
                    )
                })
            }
        </>
    )
}

export default Replies;