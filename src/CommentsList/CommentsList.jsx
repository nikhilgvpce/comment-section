


const Comments = () => {
    const comments = [{ name: '', comment: '', isComment: true }, {}]
    return (
        <>
            {
                comments.map((comment, index) => {
                    if (index == 0) {
                        return (
                            <div className="comment-section" index={index}>
                                <input className="name" placeholder="Name" value={commenterName} onChange={handleCommenterName} />
                                <input className="name" placeholder="Name" value={commentValue} onChange={handleCommentName} />
                                <button>Post</button>
                            </div>
                        )
                    } else {
                        return (
                            <div className="reply-section">
                                <div>{comment.commenterName}</div>
                                <div>{comment.commenterName}</div>
                            </div>
                        )
                    }
                })
            }
        </>

    )
}

export default Comments;