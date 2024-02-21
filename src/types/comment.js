import PropTypes from "prop-types";

const commentPropTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export { commentPropTypes };
