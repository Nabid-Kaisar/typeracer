interface SnackbarProps {
  anchorOrigin?: string;
  message: string;
  open: boolean;
  autoHideDuration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  anchorOrigin,
  message,
  open,
  autoHideDuration = 3000,
}) => {
  return <Snackbar message={message} open={open} anchorOrigin={anchorOrigin} />;
};

export default Snackbar;
