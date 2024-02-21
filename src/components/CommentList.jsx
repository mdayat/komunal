import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

import { commentPropTypes } from "../types/comment";
import { owner } from "../types/owner";

import styles from "../styles/comment.module.css";

// Dynamic loaded component
const CommentItem = dynamic(() =>
  import("./CommentItem").then((commentItem) => commentItem.CommentItem)
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
  return (
    <section className={styles.commentListContainer}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 600, marginBottom: 2 }}
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
