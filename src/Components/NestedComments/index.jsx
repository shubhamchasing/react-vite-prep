import React, { useState } from "react";
import "./styles.css";

// Mock Comment Data (initial state)
const mockComments = [
  {
    id: 1,
    text: "Happy New Year folks! What are your resolutions this year?",
    replies: [
      {
        id: 2,
        text: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: 3,
            text: "I tried last year and gave up.",
            replies: [
              {
                id: 4,
                text: "Good on you, nothing is more important than good health.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Counter for generating unique IDs
let idCounter = 4;

export default function CommentApp() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  // Function to add a reply
  const addReply = (id, text) => {
    const addNestedReply = (commentList) => {
      return commentList.map((comment) => {
        // your code

        if (comment.id === id) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: ++idCounter, text, replies: [] },
            ],
          };
        }

        return { ...comment, replies: addNestedReply(comment.replies) };
      });
    };

    // TODO: update state with new nested reply

    const updatedComments = addNestedReply(comments);
    setComments(updatedComments);
  };

  // Function to add top-level comment
  const addComment = () => {
    // TODO: Your code
    if (!newComment.trim()) return;

    const newComm = {
      id: ++idCounter,
      text: newComment,
      replies: [],
    };
    setComments((prev) => [...prev, newComm]);
    setNewComment("");
  };

  // Recursive Comment Component
  const Comment = ({ comment }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReply = () => {
      // TODO: Your code
      if (!replyText.trim()) return;
      addReply(comment.id, replyText);
      setShowReplyInput("");
      setShowReplyInput(false);
    };

    return (
      <div className="comment">
        <div>{comment?.text}</div>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          data-testid={`reply-btn-${comment.id}`}
        >
          Add a reply
        </button>

        {showReplyInput && (
          <div className="reply-box">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              data-testid={`reply-input-${comment.id}`}
            />
            <button
              onClick={handleReply}
              data-testid={`submit-reply-${comment.id}`}
            >
              Submit
            </button>
          </div>
        )}

        <div className="replies">
          {/* TODO:your code */}

          {comment.replies.map((reply) => (
            <Comment key={comment.id} comment={reply} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Comment Section</h2>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type a comment..."
          data-testid="new-comment-input"
        />
        <button onClick={addComment} data-testid="add-comment-btn">
          Add Comment
        </button>
      </div>

      <div className="comments">
        {/* TODO: your code */}
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
