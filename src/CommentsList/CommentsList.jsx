import { useReducer } from "react";
import CommentItem from "../CommentItem/CommentItem";
import Replies from "../Replies/Replies";
import "./CommentsList.css";
import Sort from "../Sort/Sort";

const dummyComments = JSON.parse(localStorage.getItem('comments') || null)

const initialState = {
    name: '',
    commentText: '',
    comments: dummyComments || [
        {
            headerValue: 'Comment:',
            name: 'Nikhil',
            commentText: 'Hi I am a comment',
            type: 'comment',
            date: '12/01/2024',
            replies: [{ name: 'Akhil', headerValue: 'Reply', commentText: 'Hi I am reply to a comment', date: '12/01/2024' }]
        }
    ],
    commentIndex: '',
    replyEditIndex: '',
    isLowToHigh: true,
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
            // modifyComments(comments, indexes)
            localStorage.setItem('comments', JSON.stringify(action.payload.comments))
            return {
                ...state,
                comments: action.payload.comments,
                name: '',
                commentText: '',
                commentIndex: '',
                replyEditIndex: ''
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
        case 'SET_SORTING_ORDER':
            return {
                ...state,
                isLowToHigh: !state.isLowToHigh
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
            date: new Date().toLocaleDateString(),
        }
        let comments = state.comments
        if (Number.isInteger(parentIndex)) {
            newComment.headerValue = 'Reply';
            if (Number.isInteger(index)) {
                comments[parentIndex].replies[index] = newComment
            } else {
                if (comments[parentIndex].replies && comments[parentIndex].replies.length) {
                    comments[parentIndex].replies = [
                        ...comments[parentIndex].replies,
                        newComment
                    ]
                } else {
                    comments[parentIndex].replies = [
                        newComment
                    ]
                }
            }
        } else if (Number.isInteger(index)) {
            comments[index] = {...newComment, replies: comments[index].replies};
        } else {
            newComment.replies = [];
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

    const handleReplyEdit = (parentIndex, index) => {
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

    const handleSort = () => {
        const comments = state.comments;
        dispatch({
            type: 'SET_SORTING_ORDER'
        })
        comments.sort((a, b) => {
            return a.date < b.date
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
                <Sort isLowToHigh={state.isLowToHigh} onSort={handleSort} />
                {
                    state.comments?.map((commentItem, index) => {
                        const isEditMode = index === state.commentIndex && !Number.isInteger(state.replyEditIndex) && state.isCommentInEditMode;
                        const commentProps = {
                            headerValue: 'Comment',
                            inputValue: commentItem.name,
                            textAreaValue: commentItem.commentText,
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