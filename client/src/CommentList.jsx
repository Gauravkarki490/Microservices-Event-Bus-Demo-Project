import React from 'react';

const CommentItem = ({ comment }) => {
    let content;
    let baseClasses =
        'mb-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors';
    let extraClasses = '';

    switch (comment.status) {
        case 'approved':
            content = comment.content;
            break;
        case 'rejected':
            content = <i>Comment rejected</i>;
            extraClasses = ' text-red-600';
            break;
        default:
            content = <i>Waiting to be Moderated</i>;
            extraClasses = ' text-yellow-600';
    }

    return <div className={`${baseClasses}${extraClasses}`}>{content}</div>;
};

const CommentList = ({ comments = [] }) => {
    return (
        <div className="mt-4 p-6 bg-gradient-to-r from-white to-gray-100 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Comments</h3>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            )}
        </div>
    );
};

export default CommentList;