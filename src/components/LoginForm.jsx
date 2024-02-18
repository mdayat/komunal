import PropTypes from "prop-types";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const emailHelperText = error ? errorMessage : "Please enter your email";
  const passwordHelperText = error
    ? errorMessage
    : "Password must contain at least 6 characters";

  return (
    <>
      <Container
        component="form"
        maxWidth="xs"
        autoComplete="off"
        onSubmit={submitLogin}
      >
        <TextField
          fullWidth
          required
          data-testid="email"
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          size="small"
          margin="normal"
          error={error}
          helperText={emailHelperText}
          value={email}
          onChange={setEmail}
        />

        <TextField
          fullWidth
          required
          data-testid="password"
          id="password"
          label="Password"
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
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={setPasswordVisibility}
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
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
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Container>

      <Backdrop open={loading}>
        <CircularProgress size={64} sx={{ color: "#fff" }} />
      </Backdrop>
    </>
  );
}

LoginForm.propTypes = loginFormPropTypes;

export { LoginForm };
