import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Api from "../api";

const App = () => {
  const [getRes, setGetRes] = useState("");

  useEffect(() => {
    Api.get("/").then((res) => setGetRes(res.data as string));
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required(),
    }),
    onSubmit: (values) => {
      Api.post("/signup", values);
    },
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: "center",
          my: 5,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          # encrypte-http-req-body
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          my: 1,
        }}
      >
        <Box>
          <Button variant="contained" >
            GET
          </Button>
        </Box>
        <Box>{getRes}</Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          my: 1,
        }}
      >
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-container">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <p>{formik.errors.firstName}</p>
              ) : null}
            </div>
            <div className="input-container">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p>{formik.errors.lastName}</p>
              ) : null}
            </div>
            <div className="input-container">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>
        </Box>
        <Box>4</Box>
      </Box>
    </Container>
  );
};

export default App;
