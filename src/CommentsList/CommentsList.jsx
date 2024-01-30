import { useReducer } from "react";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";
import "./CommentsList.css"

const initialState = {
    name: '',
    commentText: '',
    comments: [
        {
            headerValue: 'Comment:',
            name: 'Nikhil',
            commentText: 'Hi I am a comment',
            type: 'comment',
            date: '',
            replies: [{ name: 'Akhil', comment: 'Hi I am reply to a comment', date: '' }]
        }
    ],
    commentReplyIndex: '',
    replyEditIndex: ''
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
            // modifyComments(comments, indexes)
            return {
                ...state,
                comments: action.payload.comments,
                name: '',
                commentText: '',
                commentReplyIndex: ''

            }
        case 'SET_REPLY_INDEX':
            return {
                ...state,
                commentReplyIndex: action.payload.commentReplyIndex
            }
    }
}

const Comments = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleNameChange = (e) => {
        const value = e.target.value;
        dispatch({
            type: 'SET_COMMENTER_NAME',
            payload: value
        })
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        dispatch({
            type: 'SET_COMMENT_TEXT',
            payload: value
        })
    }

    const handlePostComment = (parentIndex, index) => {
        if (!state.name || !state.commentText) return;
        const newComment = {
            headerValue: 'Comment',
            name: state.name,
            commentText: state.commentText,
            type: 'comment',
            date: '',
            replies: []
        }
        const comments = state.comments
        if (parentIndex && index) {
            comments[parentIndex].replies = [
                ...comments[parentIndex].replies,
                newComment
            ]
        }
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                comments: [...state.comments, newComment]
            }
        })

    }

    const handleOnReply = (parentIndex, index) => {
        dispatch({
            type: 'SET_REPLY_INDEX',
            payload: {
                commentReplyIndex: parentIndex ? parentIndex : index,
            }
        })
    }

    const commentProps = {
        headerValue: 'Comment:',
        inputValue: state.commentReplyIndex === '' ? state.name : '',
        textAreaValue: !state.commentReplyIndex === '' ? state.commentText: '',
        inputPlaceholder: "Name",
        onInputChange: handleNameChange,
        onTextAreaChange: handleCommentChange,
        onSubmit: handlePostComment,
        isEditMode: true
    }

    return (
        <>

            <div className="parent-comment" >
                <CommentItem className="always-editmode" {...commentProps} />
                {
                    state.comments?.map((commentItem, index) => {
                        const commentProps = {
                            headerValue: 'Comment',
                            inputValue: commentItem.name,
                            textAreaValue: commentItem.commentText,
                            index: index,
                            onReply: handleOnReply,
                            isEditMode: false,
                        }
                        return (
                            <div className="comment-section" >
                                <CommentItem {...commentProps} />
                                <Replies
                                    type="reply"
                                    onPostSubmit={handlePostComment}
                                    onCommentChange={handleCommentChange}
                                    onNameChange={handleNameChange}
                                    parentIndex={index}
                                    commentReplyIndex={state.commentReplyIndex}
                                    name={state.name}
                                    commentText={state.commentText}
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