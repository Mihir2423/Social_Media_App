import makeStyles from "@mui/styles/makeStyles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: 64,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  root: {
    "& .MuiTextField-root": {
      margin: "8px",
    },
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    marginTop: "24px",
  },
  googleButton: {
    marginBottom: "16px",
  },
}));
