import { Avatar, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import parse from "html-react-parser";

import { Footer } from "./Footer";
import { formatISODateString, showFormattedDate } from "../../utils/date";
import { commentPropTypes } from "../../types/comment";
import { owner } from "../../types/owner";

import styles from "../../styles/thread.module.css";

function CommentItem({
  id,
  title,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
}) {
  return (
    <article>
      <div className={styles.threadHeader}>
        <div className={styles.threadHeader__profile}>
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
        {title}
      </Typography>

      <Typography variant="body1" component="div">
        {parse(content)}
      </Typography>

      <Footer id={id} upVotesBy={upVotesBy} downVotesBy={downVotesBy} />
      <Divider sx={{ marginTop: 1 }} />
    </article>
  );
}

CommentItem.propTypes = {
  ...commentPropTypes,
  owner: PropTypes.shape({ ...owner }).isRequired,
};

export { CommentItem };
