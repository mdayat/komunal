import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

import { asyncCreateComment } from "../states/comments/action";

// Dynamic loaded components
const Backdrop = dynamic(() => import("@mui/material/Backdrop"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

function CreateComment() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  function changeContent(event) {
    setContent(event.target.value);
  }

  function submitCreateComment(event) {
    event.preventDefault();
    const comment = {
      content,
    };

    setLoading(true);
    dispatch(
      asyncCreateComment(comment, () => {
        setLoading(false);
        setContent("");
      })
    );
  }

  return (
    <>
      <form action="" autoComplete="off" onSubmit={submitCreateComment}>
        <TextField
          multiline
          fullWidth
          required
          id="comment"
          label="Your reply..."
          variant="filled"
          minRows={3}
          value={content}
          onChange={changeContent}
        />

        <Button
          disableElevation
          type="submit"
          variant="contained"
          size="small"
          sx={{
            display: "block",
            marginLeft: "auto",
            marginTop: 2,
          }}
        >
          Reply
        </Button>
      </form>

      {loading && (
        <Backdrop open={loading}>
          <CircularProgress size={64} sx={{ color: "#fff" }} />
        </Backdrop>
      )}
    </>
  );
}

export { CreateComment };
