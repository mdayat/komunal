import { useMemo } from "react";
import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SmsIcon from "@mui/icons-material/Sms";
import { useSelector } from "react-redux";

import { threadPropTypes } from "../../types/thread";
import styles from "../../styles/thread.module.css";

const threadFooterPropTypes = {
  category: threadPropTypes.category,
  upVotesBy: threadPropTypes.upVotesBy,
  downVotesBy: threadPropTypes.downVotesBy,
  totalComments: threadPropTypes.totalComments,
};

function Footer({ category, upVotesBy, downVotesBy, totalComments }) {
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

  return (
    <div className={`${styles.threadFooter} ${styles.threadItemFooter}`}>
      <div
        className={`${styles.threadFooter__impression} ${styles.threadItemFooter__impression}`}
      >
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
