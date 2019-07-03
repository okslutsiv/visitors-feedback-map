import React from "react";
import clsx from "clsx";
import {
  Snackbar,
  SnackbarContent,
  IconButton,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";

const CheckCircleIcon = () => (
  <SvgIcon viewBox="0 0 40 40">
    <path d="m17.5 2.5c9.7 0 17.5 7.8 17.5 17.5s-7.8 17.5-17.5 17.5-17.5-7.8-17.5-17.5 7.8-17.5 17.5-17.5z m9 11.6c0.1 0 0.1-0.1 0.1-0.2s0-0.2-0.1-0.3l-2.4-1.9c-0.1-0.1-0.3-0.1-0.4-0.1s-0.1 0-0.2 0.1l-8.7 11.2s-3.4-3.3-3.5-3.4-0.3-0.2-0.4-0.2-0.3 0.2-0.4 0.2l-2 2.1c-0.1 0-0.1 0.2-0.1 0.3s0 0.1 0.1 0.2l0.2 0.1s6.1 5.8 6.1 5.9 0.3 0.3 0.4 0.3 0.3-0.2 0.4-0.3z" />
  </SvgIcon>
);

const ErrorIcon = () => (
  <SvgIcon viewBox="0 0 40 40">
    <path d="m19.8 3.8c8.9 0 16.2 7.3 16.2 16.2s-7.3 16.3-16.2 16.3-16.3-7.4-16.3-16.3 7.3-16.2 16.3-16.2z m1.8 24.3v-3.1h-3.7v3.1h3.7z m0-6.8v-10h-3.7v10h3.7z" />
  </SvgIcon>
);
const CloseIcon = () => (
  <SvgIcon viewBox="0 0 40 40">
    <path d="m17.5 2.6c9.7 0 17.5 7.8 17.5 17.5s-7.8 17.5-17.5 17.5-17.5-7.8-17.5-17.5 7.8-17.5 17.5-17.5z m8.4 23.3l-5.8-5.8 5.9-5.9c0.3-0.2 0.3-0.7 0-0.9l-1.7-1.7c-0.2-0.1-0.3-0.2-0.5-0.2s-0.2 0.1-0.4 0.2l-5.9 5.8-5.9-5.8c-0.2-0.1-0.3-0.2-0.4-0.2s-0.3 0.1-0.5 0.2l-1.6 1.7c-0.3 0.2-0.3 0.7 0 0.9l5.9 5.9-5.9 5.9c-0.2 0.1-0.2 0.3-0.2 0.4s0 0.3 0.2 0.5l1.6 1.7c0.2 0.2 0.3 0.2 0.5 0.2s0.3 0 0.4-0.2l5.9-5.9 5.9 5.8c0.2 0.2 0.3 0.3 0.4 0.3s0.3-0.1 0.5-0.3l1.6-1.6c0.2-0.1 0.3-0.3 0.3-0.5s-0.1-0.3-0.3-0.5z" />
  </SvgIcon>
);

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles = makeStyles(theme => ({
  root: {},
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  success: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
}));

export default function Feedback({ variant, message, open, onClose }) {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={clsx(classes[variant])}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
