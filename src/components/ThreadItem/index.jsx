import { Avatar, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import { Footer } from "./Footer";
import { formatISODateString, showFormattedDate } from "../../utils/date";
import { threadPropTypes } from "../../types/thread";
import { owner as threadOwner } from "../../types/owner";

import styles from "../../styles/thread-item.module.css";
import Link from "next/link";

const threadItemPropTypes = {
  ...threadPropTypes,
  owner: PropTypes.shape({ ...threadOwner }).isRequired,
};

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
}) {
  return (
    <article className={styles.threadItem}>
      <div className={styles.threadItemHeader}>
        <div className={styles.threadItemHeader__profile}>
          <Avatar
            alt={owner.name}
            src={owner.avatar}
            sx={{ width: 32, height: 32 }}
          />

          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: 500 }}
          >
            {owner.name}
          </Typography>
        </div>

        <Typography variant="caption">
          <time dateTime={formatISODateString(createdAt)}>
            {showFormattedDate(createdAt)}
          </time>
        </Typography>
      </div>

      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        sx={{ fontWeight: 600, lineHeight: "28px" }}
      >
        <Link href={`/threads/${id}`}>{title}</Link>
      </Typography>

      <Typography
        variant="body1"
        component="div"
        className={styles.truncateText}
      >
        {parse(body)}
      </Typography>

      <Footer
        category={category}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        totalComments={totalComments}
      />

      <Divider sx={{ marginTop: 2 }} />
    </article>
  );
}

ThreadItem.propTypes = threadItemPropTypes;

export { ThreadItem };
