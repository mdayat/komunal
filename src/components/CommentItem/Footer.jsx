import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { commentPropTypes } from "../../types/comment";
import styles from "../../styles/comment.module.css";

const commentItemFooterPropTypes = {
  upVotesBy: commentPropTypes.upVotesBy,
  downVotesBy: commentPropTypes.downVotesBy,
};

function Footer({ upVotesBy, downVotesBy }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    if (authUser !== null) {
      // To check whether the thread is voted or not
      for (let i = 0; i < upVotesBy.length || i < downVotesBy.length; i++) {
        if (upVotesBy[i] === authUser.id) {
          setLiked(true);
          break;
        }

        if (downVotesBy[i] === authUser.id) {
          setDisliked(true);
          break;
        }
      }
    }
  }, [authUser, upVotesBy, downVotesBy]);

  return (
    <div className={`${styles.commentFooter}`}>
      <div>
        <Tooltip title="Like">
          <IconButton aria-label="like">
            <ThumbUpIcon
              color={liked ? "primary" : "action"}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <span>{upVotesBy.length}</span>
      </div>

      <div>
        <Tooltip title="Dislike">
          <IconButton aria-label="dislike">
            <ThumbDownIcon
              color={disliked ? "primary" : "action"}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <span>{downVotesBy.length}</span>
      </div>
    </div>
  );
}

Footer.propTypes = commentItemFooterPropTypes;

export { Footer };
