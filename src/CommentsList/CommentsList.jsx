import { useReducer } from "react";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";
import "./CommentsList.css";
import Sort from "../Sort/Sort";
import { getDate, sort } from "../../utils";

const dummyComments = JSON.parse(localStorage.getItem('comments') || null)

const initialState = {
    name: '',
    commentText: '',
    date: '',
    comments: dummyComments || [
        {
            headerValue: 'Comment:',
            name: 'Nikhil',
            commentText: 'Hi I am a comment',
            type: 'comment',
            date: {
                "formatted": "3rd February 2024",
                "unformatted": "1706936050651"
            },
            replies: [
                {
                    "name": "Name 12",
                    "commentText": "Reply 12",
                    "date": {
                        "formatted": "3rd February 2024",
                        "unformatted": "1706936582883"
                    },
                    "headerValue": "Reply"
                },
                {
                    "name": "Name 11",
                    "commentText": "Reply 11",
                    "date": {
                        "formatted": "3rd February 2024",
                        "unformatted": "1706936571461"
                    },
                    "headerValue": "Reply"
                }
            ]
        }
    ],
    commentIndex: '',
    replyEditIndex: '',
    isCommentInEditMode: false,
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
            localStorage.setItem('comments', JSON.stringify(action.payload.comments))
            return {
                ...state,
                comments: action.payload.comments,
                name: '',
                commentText: '',
                commentIndex: '',
                replyEditIndex: '',
            }
        case 'SET_COMMENT_INDEX':
            return {
                ...state,
                commentIndex: action.payload.commentIndex,
                isCommentInEditMode: action.payload.isCommentInEditMode,
            }
        case 'SET_REPLY_EDIT_INDEX':
            return {
                ...state,
                replyEditIndex: action.payload.replyEditIndex
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
            name: state.name,
            commentText: state.commentText,
        }
        let comments = state.comments
        if (Number.isInteger(parentIndex)) {
            newComment.headerValue = 'Reply';
            if (Number.isInteger(index)) {
                const existingReply = comments[parentIndex].replies[index]
                comments[parentIndex].replies[index] = { ...existingReply, ...newComment }
            } else {
                const newReply = {
                    ...newComment,
                    date: getDate()
                }
                if (comments[parentIndex].replies && comments[parentIndex].replies.length) {
                    comments[parentIndex].replies = [
                        ...comments[parentIndex].replies,
                        newReply
                    ]
                } else {
                    comments[parentIndex].replies = [
                        newReply
                    ]
                }
            }
        } else if (Number.isInteger(index)) {
            const existingComment = comments[index];
            comments[index] = { ...existingComment, ...newComment };
        } else {
            newComment.replies = [];
            newComment.date = getDate();
            comments = [
                ...comments,
                newComment
            ]
        }
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                comments: comments
            }
        })

    }

    const handleDelete = (parentIndex, index) => {
        const comments = state.comments;
        if (Number.isInteger(parentIndex)) {
            if (Number.isInteger(index)) {
                comments[parentIndex].replies.splice(index, 1)
            } else {
                comments.splice(parentIndex, 1)
            }
        } else if (Number.isInteger(index)) {
            comments.splice(index, 1)
        }
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                comments: comments
            }
        })
    }

    const handleOnReply = (index) => {
        dispatch({
            type: 'SET_COMMENT_INDEX',
            payload: {
                commentIndex: index,
                isCommentInEditMode: false
            }
        })
    }

    const handleReplyEdit = (parentIndex, index, dateValue) => {
        if (!Number.isInteger(parentIndex)) {
            dispatch({
                type: 'SET_COMMENT_INDEX',
                payload: {
                    commentIndex: index,
                    isCommentInEditMode: true,
                }
            })

            const name = state.comments[index].name
            const value = state.comments[index].commentText;
            dispatch({
                type: 'SET_COMMENTER_NAME',
                payload: name
            })

            dispatch({
                type: 'SET_COMMENT_TEXT',
                payload: value
            })
            return;
        }
        dispatch({
            type: 'SET_COMMENT_INDEX',
            payload: {
                commentIndex: parentIndex,
                isCommentInEditMode: false,
            }
        })
        dispatch({
            type: 'SET_REPLY_EDIT_INDEX',
            payload: {
                replyEditIndex: index,
            }
        })
        const name = state.comments[parentIndex].replies[index].name
        const value = state.comments[parentIndex].replies[index].commentText
        dispatch({
            type: 'SET_COMMENTER_NAME',
            payload: name
        })

        dispatch({
            type: 'SET_COMMENT_TEXT',
            payload: value
        })
    }

    const commentProps = {
        headerValue: 'Comment:',
        inputValue: state.commentIndex === '' ? state.name : '',
        textAreaValue: state.commentIndex === '' ? state.commentText : '',
        inputPlaceholder: "Name",
        onInputChange: handleNameChange,
        onTextAreaChange: handleCommentChange,
        onSubmit: handlePostComment,
        isEditMode: true,
    }

    return (
        <>
            <div className="parent-comment" >
                <CommentItem className="always-editmode" {...commentProps} />
                <Sort comments={state.comments} dispatch={dispatch} />
                {
                    state.comments?.map((commentItem, index) => {
                        const isEditMode = index === state.commentIndex && !Number.isInteger(state.replyEditIndex) && state.isCommentInEditMode;
                        const commentProps = {
                            headerValue: 'Comment',
                            inputValue: commentItem.name,
                            textAreaValue: commentItem.commentText,
                            dateValue: commentItem.date,
                            index: index,
                            onReply: handleOnReply,
                            onEdit: handleReplyEdit,
                            onDelete: handleDelete,
                            onSubmit: handlePostComment,
                            onTextAreaChange: handleCommentChange,
                            onInputChange: handleNameChange
                        }
                        if (isEditMode) {
                            commentProps.inputValue = state.name;
                            commentProps.textAreaValue = state.commentText;
                            commentProps.isEditMode = true;
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
                                    commentIndex={state.commentIndex}
                                    replyEditIndex={state.replyEditIndex}
                                    name={state.name}
                                    commentText={state.commentText}
                                    replies={commentItem.replies}
                                    onEdit={handleReplyEdit}
                                    onDelete={handleDelete}
                                    isCommentInEditMode={state.isCommentInEditMode}
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