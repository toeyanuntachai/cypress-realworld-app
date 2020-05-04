import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object, mixed } from "yup";
import { Button, Grid } from "@material-ui/core";
import { User, DefaultPrivacyLevel, UserSettingsPayload } from "../models";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DefaultPrivacyLevelValues = Object.values(DefaultPrivacyLevel);

const validationSchema = object({
  firstName: string().required("Enter a first name"),
  lastName: string().required("Enter a last name"),
  email: string()
    .email("Must contain a valid email address")
    .required("Enter an email address"),
  phoneNumber: string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Enter a phone number"),
  defaultPrivacyLevel: mixed<DefaultPrivacyLevel>().oneOf(
    DefaultPrivacyLevelValues
  ),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface UserSettingsProps {
  userProfile: User;
  updateUser: Function;
}

const UserSettingsForm: React.FC<UserSettingsProps> = ({
  userProfile,
  updateUser,
}) => {
  const classes = useStyles();
  const initialValues: UserSettingsPayload = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber,
    defaultPrivacyLevel: userProfile.defaultPrivacyLevel,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        updateUser({ id: userProfile.id, ...values });
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={classes.form} data-test="user-settings-form">
          <Field name="firstName">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id={"user-settings-firstName-input"}
                type="text"
                placeholder="First Name"
                data-test={"user-settings-firstName-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="lastName">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id={"user-settings-lastName-input"}
                type="text"
                placeholder="Last Name"
                data-test={"user-settings-lastName-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="email">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id={"user-settings-email-input"}
                type="text"
                placeholder="Email"
                data-test={"user-settings-email-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="phoneNumber">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id={"user-settings-phoneNumber-input"}
                type="text"
                placeholder="Phone Number"
                data-test={"user-settings-phoneNumber-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-test="user-settings-submit"
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserSettingsForm;
