import dynamic from "next/dynamic";
import { useMemo } from "react";
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
  const threadID = useSelector((states) => states.threadDetail.id);
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

  function handleUpVoteComment() {
    const hasVoted = upVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteComment(threadID, id, authUser.id));
    } else {
      dispatch(asyncUpVoteComment(threadID, id, authUser.id));
    }
  }

  function handleDownVoteComment() {
    const hasVoted = downVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteComment(threadID, id, authUser.id));
    } else {
      dispatch(asyncDownVoteComment(threadID, id, authUser.id));
    }
  }

  return (
    <div className={`${styles.commentFooter}`}>
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
