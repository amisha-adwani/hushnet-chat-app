import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import ChatContext from "../context/ChatContext";

export default function Login() {
  const context = useContext(ChatContext);
  const { setUsername, setSenderId } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const host = process.env.REACT_APP_LOGIN_URL;
    const response = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setSenderId(json.user._id);
      setUsername(json.user.name);
      localStorage.setItem("token", json.authToken);
      navigate("/room");
      setAlert({ severity: "success", message: "successfully logged in" });
    } else {
      setAlert({ severity: "error", message: "Invalid details" });
    }

    setTimeout(() => setAlert(null), 1500);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert !== null && (
          <Alert severity={alert.severity}>{alert.message}</Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                placeholder="test@gmail.com"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                placeholder="test12"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
