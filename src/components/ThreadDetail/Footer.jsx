import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chip, IconButton, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { threadPropTypes } from "../../types/thread";
import styles from "../../styles/thread.module.css";

const threadFooterPropTypes = {
  category: threadPropTypes.category,
  upVotesBy: threadPropTypes.upVotesBy,
  downVotesBy: threadPropTypes.downVotesBy,
};

function Footer({ category, upVotesBy, downVotesBy }) {
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
    <div className={`${styles.threadFooter} ${styles.threadDetailFooter}`}>
      <div
        className={`${styles.threadFooter__impression} ${styles.threadDetailFooter__impression}`}
      >
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

      <Chip variant="outlined" size="medium" label={category} />
    </div>
  );
}

Footer.propTypes = threadFooterPropTypes;

export { Footer };
