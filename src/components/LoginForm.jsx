import Link from "next/link";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "../styles/login-register.module.css";

// Dynamic loaded components
const Visibility = dynamic(() => import("@mui/icons-material/Visibility"));
const Backdrop = dynamic(() => import("@mui/material/Backdrop"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

const loginFormPropTypes = {
  submitLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  passwordVisible: PropTypes.bool.isRequired,
  setPasswordVisibility: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

function LoginForm({
  submitLogin,
  email,
  setEmail,
  password,
  setPassword,
  passwordVisible,
  setPasswordVisibility,
  error,
  errorMessage,
  loading,
}) {
  const emailHelperText = error ? errorMessage : "";
  const passwordHelperText = error
    ? errorMessage
    : "Password must contain at least 6 characters";

  return (
    <>
      <form
        action=""
        autoComplete="off"
        className={styles.loginRegisterForm}
        onSubmit={submitLogin}
      >
        <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>
          Sign in
        </Typography>

        <TextField
          fullWidth
          required
          type="email"
          id="email"
          label="Email"
          placeholder="Email"
          variant="outlined"
          size="small"
          margin="normal"
          sx={{ marginTop: 0 }}
          error={error}
          helperText={emailHelperText}
          value={email}
          onChange={setEmail}
        />

        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          placeholder="Password"
          variant="outlined"
          size="small"
          margin="normal"
          error={error}
          helperText={passwordHelperText}
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={setPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={passwordVisible ? "Hide Password" : "Show Password"}
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={setPasswordVisibility}
                  >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          disableElevation
          data-testid="submit"
          type="submit"
          variant="contained"
          size="medium"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        <Link href="/register" className={styles.btnLink}>
          Don&apos;t have an account?
        </Link>
      </form>

      {loading && (
        <Backdrop open={loading} sx={{ zIndex: 20 }}>
          <CircularProgress size={64} sx={{ color: "#fff" }} />
        </Backdrop>
      )}
    </>
  );
}

LoginForm.propTypes = loginFormPropTypes;

export { LoginForm };
