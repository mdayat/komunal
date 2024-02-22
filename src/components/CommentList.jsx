import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

import { commentPropTypes } from "../types/comment";
import { owner } from "../types/owner";

import styles from "../styles/comment.module.css";

// Dynamic loaded components
const Alert = dynamic(() => import("@mui/material/Alert"));
const CommentItem = dynamic(() =>
  import("./CommentItem").then((commentItem) => commentItem.CommentItem)
);
const CreateComment = dynamic(() =>
  import("./CreateComment").then((createComment) => createComment.CreateComment)
);

const commentListPropTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      ...commentPropTypes,
      owner: PropTypes.shape({ ...owner }).isRequired,
    }).isRequired
  ).isRequired,
};

function CommentList({ comments }) {
  const authUser = useSelector((states) => states.authUser);

  return (
    <section className={styles.commentListContainer}>
      {authUser === null ? (
        <Alert variant="filled" severity="info">
          Login to reply a thread
        </Alert>
      ) : (
        <CreateComment />
      )}

      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 600, marginTop: 3, marginBottom: 2 }}
      >
        Comments ({comments.length})
      </Typography>

      {comments.length !== 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            upVotesBy={comment.upVotesBy}
            downVotesBy={comment.downVotesBy}
            owner={comment.owner}
          />
        ))}
    </section>
  );
}

CommentList.propTypes = commentListPropTypes;

export { CommentList };
