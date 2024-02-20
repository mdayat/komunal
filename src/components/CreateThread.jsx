import { useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import PropTypes from "prop-types";

import { useInput } from "../hooks/useInput";
import { asyncCreateThread } from "../states/threads/action";

import styles from "../styles/thread-form.module.css";

// Dynamic loaded components
const Backdrop = dynamic(() => import("@mui/material/Backdrop"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

const createThreadPropTypes = {
  dialogOpened: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

function CreateThread({ dialogOpened, closeDialog }) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useInput("");
  const [category, setCategory] = useInput("");
  const [body, setBody] = useInput("");

  const dispatch = useDispatch();

  function submitCreateThread(event) {
    event.preventDefault();
    const thread = {
      title,
      category,
      body,
    };

    setLoading(true);
    dispatch(
      asyncCreateThread(thread, () => {
        setLoading(false);
        closeDialog();
      })
    );
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={dialogOpened}
      onClose={closeDialog}
      sx={{ marginTop: 0 }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          lineHeight: "normal",
          fontWeight: 500,
          textAlign: "center",
          paddingTop: 3,
        }}
      >
        Create Thread
      </DialogTitle>

      <form
        action=""
        autoComplete="off"
        className={styles.threadForm}
        onSubmit={submitCreateThread}
      >
        <TextField
          fullWidth
          required
          type="text"
          id="title"
          label="Title"
          variant="outlined"
          size="small"
          margin="normal"
          sx={{ marginTop: 0 }}
          value={title}
          onChange={setTitle}
        />

        <TextField
          fullWidth
          required
          type="text"
          id="category"
          label="Category"
          variant="outlined"
          size="small"
          margin="normal"
          value={category}
          onChange={setCategory}
        />

        <TextField
          fullWidth
          required
          multiline
          id="body"
          label="Content"
          variant="outlined"
          size="small"
          margin="normal"
          minRows={3}
          value={body}
          onChange={setBody}
        />

        <div className={styles.threadForm__actions}>
          <Button
            disableElevation
            type="button"
            variant="outlined"
            size="medium"
            onClick={closeDialog}
          >
            Cancel
          </Button>

          <Button
            disableElevation
            type="submit"
            variant="contained"
            size="medium"
          >
            Create
          </Button>
        </div>
      </form>

      {loading && (
        <Backdrop open={loading}>
          <CircularProgress size={64} sx={{ color: "#fff" }} />
        </Backdrop>
      )}
    </Dialog>
  );
}

CreateThread.propTypes = createThreadPropTypes;

export { CreateThread };
