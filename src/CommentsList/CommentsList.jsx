import { useReducer } from "react";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";
import "./CommentsList.css"

const initialState = {
    name: '',
    commentText: '',
    comments: [
        {
            name: 'Nikhil',
            comment: 'Hi I am a comment',
            type: 'comment',
            date: '',
            replies: [{ name: 'Akhil', comment: 'Hi I am reply to a comment', date: '' }]
        }
    ],
}

function modifyComments(comments, indexes = [], commenterName, commentText) {
    const comment = comments[indexes[0]];
    if (indexes.length && indexes.length == 1) {
        comments[indexes[0]] = modifyComments(comment.replies, indexes.slice(1))
    } else {
        return comments
    }
}

function reducer(state = { initialState }, action = { type, payload: {} }) {
    switch (action.type) {
        case 'SET_COMMENTER_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SET_COMMENT_TEXT':
            return {
                ...state,
                commentText: action.payload
            }
        case 'POST_COMMENT':
            const comments = state.comments;
            modifyComments(comments, indexes)
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        name: state.name,
                        commentText: state.commentText,
                        type: action.payload.type,
                        date: new Date().toLocaleDateString()
                    }
                ]
            }
    }
}

const Comments = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const editIndex = [];

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (!value) return;
        dispatch({
            type: 'SET_COMMENTER_NAME',
            payload: value
        })
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        if (!value) return;
        dispatch({
            type: 'SET_COMMENT_TEXT',
            payload: value
        })
    }

    const handlePostComment = () => {
        if (!state.name || state.commentText) return;
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                type: 'COMMENT'
            }
        })
    }

    const commentProps = {
        inputPlaceholder: "Name",
        onInputChange: handleNameChange,
        inputValue: state.name,
        onTextAreaChange: handleCommentChange,
        textAreaValue: state.comment,
        onSubmit: handlePostComment,
    }

    return (
        <>

            <div className="parent-comment" >
                <CommentItem {...commentProps} />
                {
                    state.comments?.map((commentItem, index) => {
                        const commentProps = {
                            inputPlaceholder: "Name",
                            onInputChange: handleNameChange,
                            inputValue: commentItem.name,
                            onTextAreaChange: handleCommentChange,
                            textAreaValue: commentItem.comment,
                            onSubmit: handlePostComment,
                            index: index
                        }
                        return (
                            <div className="comment-section" >
                                <CommentItem {...commentProps} />
                                <Replies
                                    type="reply"
                                    onPostSubmit={handlePostComment}
                                    onCommentChange={handleCommentChange}
                                    onNameChange={handleNameChange}
                                    {...commentItem.replies}
                                />
                            </div>
                        )
                    })
                }
            </div>

        </>

    )
}

export default Comments;