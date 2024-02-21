import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chip, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../../states/threadDetail/action";
import { threadPropTypes } from "../../types/thread";

import styles from "../../styles/thread.module.css";

// Dynamic loaded component
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));

const threadFooterPropTypes = {
  id: threadPropTypes.id,
  category: threadPropTypes.category,
  upVotesBy: threadPropTypes.upVotesBy,
  downVotesBy: threadPropTypes.downVotesBy,
};

function Footer({ id, category, upVotesBy, downVotesBy }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

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

  function handleUpVoteThread() {
    const hasVoted = upVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteThread(id, authUser.id));
    } else {
      dispatch(asyncUpVoteThread(id, authUser.id));
    }
  }

  function handleDownVoteThread() {
    const hasVoted = downVotesBy.includes(authUser.id);
    if (hasVoted) {
      dispatch(asyncNeutralVoteThread(id, authUser.id));
    } else {
      dispatch(asyncDownVoteThread(id, authUser.id));
    }
  }

  const threadFooter__impression =
    authUser === null
      ? styles.threadItemFooter__impression
      : styles.threadDetailFooter__impression;

  return (
    <div className={`${styles.threadFooter} ${styles.threadDetailFooter}`}>
      <div
        className={`${styles.threadFooter__impression} ${threadFooter__impression}`}
      >
        <div>
          {authUser === null ? (
            <ThumbUpIcon
              color={liked ? "primary" : "action"}
              fontSize="small"
            />
          ) : (
            <Tooltip title="Like">
              <IconButton aria-label="like" onClick={handleUpVoteThread}>
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
              <IconButton aria-label="dislike" onClick={handleDownVoteThread}>
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

      <Chip variant="outlined" size="medium" label={category} />
    </div>
  );
}

Footer.propTypes = threadFooterPropTypes;

export { Footer };
