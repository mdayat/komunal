import PropTypes from "prop-types";

const threadPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export { threadPropTypes };
