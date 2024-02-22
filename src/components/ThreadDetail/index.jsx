import { memo } from "react";
import { Avatar, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import { Footer } from "./Footer";
import { formatISODateString, showFormattedDate } from "../../utils/date";
import { threadPropTypes } from "../../types/thread";
import { owner as threadOwner } from "../../types/owner";

import styles from "../../styles/thread.module.css";

const threadDetailPropTypes = {
  title: threadPropTypes.title,
  body: threadPropTypes.body,
  category: threadPropTypes.category,
  createdAt: threadPropTypes.createdAt,
  upVotesBy: threadPropTypes.upVotesBy,
  downVotesBy: threadPropTypes.downVotesBy,
  owner: PropTypes.shape({ ...threadOwner }),
};

const ThreadDetail = memo(function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
}) {
  return (
    <article className={styles.threadDetail}>
      <div className={styles.threadHeader}>
        <div className={styles.threadHeader__profile}>
          <Avatar alt={owner.name} src={owner.avatar} />

          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 500, lineHeight: "normal" }}
          >
            {owner.name}
          </Typography>
        </div>

        <Typography variant="body2">
          <time dateTime={formatISODateString(createdAt)}>
            {showFormattedDate(createdAt)}
          </time>
        </Typography>
      </div>

      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: 600, marginBottom: 2 }}
      >
        {title}
      </Typography>

      <Typography variant="body1" component="div">
        {parse(body)}
      </Typography>

      <Footer
        category={category}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
      />

      <Divider sx={{ marginTop: 2 }} />
    </article>
  );
});

ThreadDetail.propTypes = threadDetailPropTypes;

export { ThreadDetail };
