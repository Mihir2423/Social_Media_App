// Using comments :) (for this file only)
import React from "react";
import {
  Avatar,
  Paper,
  Grid,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import Input from "./Input";
import useStyles from "./styles";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../redux/actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const dispatch = useDispatch();
  //? Handle Submit for Auth
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        Store.addNotification({
          title: "Wonderful!",
          message: "Sign Up Failed.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        return;
      }
      dispatch(signup(formData, navigate))
        .then(() => navigate("/"))
        .then(() => {
          Store.addNotification({
            title: "Wonderful!",
            message: "Sign Up Successful.",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        });
    } else {
      dispatch(signin(formData, navigate)).then(() => navigate("/"));
      Store.addNotification({
        title: "Wonderful!",
        message: "Sign In Successful.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };
  //? Handle Change function to store input values in formData state
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  //? To switch between sign up and sign in
  function switchMode() {
    setFormData(initialState);
    setIsSignup(!isSignup);
    setShowPassword(false);
  }
  //? All the use State
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = React.useState(initialState);
  const [isSignup, setIsSignup] = React.useState(false);

  //? Using styles
  const classes = useStyles();
  const navigate = useNavigate();

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/");
  }, [navigate]);


  return (
    <Container component="main" maxWidth="xs">
      <Paper
        className={classes.paper}
        elevation={3}
        sx={{ backgroundColor: "#EAFDFC" }}
      >
        <Avatar className={classes.avatar}>
          <MdLockOutline color="blue" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Re-enter Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "24px", marginBottom: "16px" }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
