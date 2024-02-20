import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SmsIcon from "@mui/icons-material/Sms";
import { useSelector } from "react-redux";

import { threadPropTypes } from "../../types/thread";
import styles from "../../styles/thread-item.module.css";

const threadFooterPropTypes = {
  category: threadPropTypes.category,
  upVotesBy: threadPropTypes.upVotesBy,
  downVotesBy: threadPropTypes.downVotesBy,
  totalComments: threadPropTypes.totalComments,
};

function Footer({ category, upVotesBy, downVotesBy, totalComments }) {
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
    <div className={styles.threadItemFooter}>
      <div className={styles.threadItemFooter__impression}>
        <div>
          <ThumbUpIcon color={liked ? "primary" : "action"} fontSize="small" />
          <span>{upVotesBy.length}</span>
        </div>

        <div>
          <ThumbDownIcon
            color={disliked ? "primary" : "action"}
            fontSize="small"
          />
          <span>{downVotesBy.length}</span>
        </div>

        <div>
          <SmsIcon color="action" fontSize="small" />
          <span>{totalComments}</span>
        </div>
      </div>

      <Chip variant="outlined" size="medium" label={category} />
    </div>
  );
}

Footer.propTypes = threadFooterPropTypes;

export { Footer };
