import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Form } from "formik"
import { object, string } from "yup"

export const registerSchema = object({
  username: string()
    .max(20, "Username must be less than 20 characters.")
    .required("Username is required"),
  firstName: string()
    .max(20, "First name must be less than 20 characters.")
    .required("First name is required"),
  lastName: string()
    .max(20, "Last name must be less than 20 characters.")
    .required("Last name is required"),
  email: string()
    .email("Please enter a valid email.")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be no more than 20 characters long")
    .matches(/\d+/, "Password must contain a number")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]+/, "Password must contain a special character"),
});

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="User Name"
          name="username"
          id="userName"
          type="text"
          variant="outlined"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          label="First Name"
          name="firstName"
          id="firstName"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          id="lastName"
          type="text"
          variant="outlined"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" size="large" color="primary" sx={{ mt: 2, backgroundColor: '#0CC0DF' }}>
          Submit
        </Button>
      </Box>
    </Form>
  )
}

export default RegisterForm
