import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { commentPropTypes } from "../../types/comment";
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from "../../states/comments/action";

import styles from "../../styles/comment.module.css";

// Dynamic loaded component
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));

const commentItemFooterPropTypes = {
  id: commentPropTypes.id,
  upVotesBy: commentPropTypes.upVotesBy,
  downVotesBy: commentPropTypes.downVotesBy,
};

function Footer({ id, upVotesBy, downVotesBy }) {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const { liked, disliked } = useMemo(() => {
    let liked = false;
    let disliked = false;

    if (authUser !== null) {
      for (let i = 0; i < upVotesBy.length || i < downVotesBy.length; i++) {
        if (upVotesBy[i] === authUser.id) {
          liked = true;
          break;
        }

        if (downVotesBy[i] === authUser.id) {
          disliked = true;
          break;
        }
      }
    }

    return { liked, disliked };
  }, [authUser, upVotesBy, downVotesBy]);

  const handleUpVoteComment = useCallback(() => {
    const hasVoted = upVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteComment(id));
    } else {
      dispatch(asyncUpVoteComment(id));
    }
  }, [authUser.id, dispatch, id, upVotesBy]);

  const handleDownVoteComment = useCallback(() => {
    const hasVoted = downVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteComment(id));
    } else {
      dispatch(asyncDownVoteComment(id));
    }
  }, [authUser.id, dispatch, id, downVotesBy]);

  const voteEnabled =
    authUser === null
      ? styles.commentFooter__voteDisabled
      : styles.commentFooter__voteEnabled;

  return (
    <div className={`${styles.commentFooter} ${voteEnabled}`}>
      <div>
        {authUser === null ? (
          <ThumbUpIcon color={liked ? "primary" : "action"} fontSize="small" />
        ) : (
          <Tooltip title="Like">
            <IconButton aria-label="like" onClick={handleUpVoteComment}>
              <ThumbUpIcon
                color={liked ? "primary" : "action"}
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        )}

        <span>{upVotesBy.length}</span>
      </div>

      <div>
        {authUser === null ? (
          <ThumbDownIcon
            color={disliked ? "primary" : "action"}
            fontSize="small"
          />
        ) : (
          <Tooltip title="Dislike">
            <IconButton aria-label="dislike" onClick={handleDownVoteComment}>
              <ThumbDownIcon
                color={disliked ? "primary" : "action"}
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        )}
        <span>{downVotesBy.length}</span>
      </div>
    </div>
  );
}

Footer.propTypes = commentItemFooterPropTypes;

export { Footer };
