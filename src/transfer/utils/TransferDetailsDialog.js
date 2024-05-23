import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import TransferDetails from "../../hooks/TransferDetails";
import { TypographyWarning } from "../../hooks/styles";
const TransferDetailsDialog = ({
  open,
  onClose,
  transferDetails,
  warningMessage,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TypographyWarning> {warningMessage}</TypographyWarning>

        <Typography variant="h6">Transfer Details</Typography>
        <TransferDetails details={transferDetails} />
      </DialogContent>
    </Dialog>
  );
};
export default TransferDetailsDialog;
