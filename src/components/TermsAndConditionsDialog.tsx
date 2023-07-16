import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";

interface TermsAndConditionsDialogProps {
  termsAndConditionsOpen: boolean;
  closeTermsAndConditions: () => void;
}

export default function TermsAndConditionsDialog({
  termsAndConditionsOpen,
  closeTermsAndConditions
}: TermsAndConditionsDialogProps) {
  const muiTheme = useTheme();

  const handleClose = () => {
    closeTermsAndConditions();
  };

  return (
    <FullscreenDialog dialogOpen={termsAndConditionsOpen} closeDialog={handleClose}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        Terms and Conditions
      </Typography>
      <Box
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto"
        }}
      >
        <Box sx={{ minHeight: "100vh", px: 4, py: 3, [muiTheme.breakpoints.up("md")]: { maxWidth: 1200, mx: "auto" } }}>
          <Typography align="center" variant="h6" marginY={1} color={muiTheme.palette.secondary.main}>
            Welcome to Dragon Run (&quot;the Game&quot;). By accessing or using the Game, you agree to be bound by the
            following terms and conditions (&quot;Terms&quot;). If you do not agree with any part of these Terms, you
            may not use the Game.
          </Typography>
          <Typography align="center" variant="h5" marginY={2} color={muiTheme.palette.text.secondary}>
            Last updated: July 16, 2023
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Intellectual Property
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            All intellectual property rights associated with Dragon Run, including but not limited to trademarks,
            copyrights, and NFTs, are owned by EmpteaXYZ or licensed to EmpteaXYZ. By using the Game, you acknowledge
            and agree that you do not acquire any ownership rights to the Game or its associated intellectual property.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            User Conduct
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            You agree to use Dragon Run in a manner consistent with applicable laws and regulations and to refrain from
            engaging in any prohibited activities. Prohibited activities include, but are not limited to, cheating,
            hacking, exploiting bugs, and engaging in any actions that could disrupt the integrity of the Game or
            violate any laws.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Ownership and Licensing
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            You retain ownership of the NFTs you acquire within Dragon Run. However, EmpteaXYZ retains the right to
            modify, upgrade, or remove elements of the Game and associated NFTs as deemed necessary. The use and
            transferability of NFTs may be subject to certain limitations and conditions as determined by EmpteaXYZ.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Transactions and Payments
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            Dragon Run may allow for the purchase, sale, or trading of NFTs. Any transactions conducted within the Game
            are subject to applicable fees or commissions, as specified by EmpteaXYZ. All transactions are considered
            final and non-refundable once completed.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Dispute Resolution
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            Any disputes arising from or relating to these Terms or your use of Dragon Run shall be resolved through
            negotiation in good faith. If a resolution cannot be reached, the parties may agree to pursue mediation or
            binding arbitration in accordance with the laws of [Jurisdiction]. Both parties agree to submit to the
            exclusive jurisdiction of the courts in [Jurisdiction] for the resolution of any disputes.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Limitation of Liability
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            In no event shall EmpteaXYZ be liable for any direct, indirect, incidental, special, or consequential
            damages, or any loss of profits or revenue, arising from the use of Dragon Run, including but not limited to
            technical issues, interruptions, or security breaches. Dragon Run is provided &quot;as is&quot; without any
            warranties or guarantees of any kind.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Termination
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            EmpteaXYZ reserves the right to terminate or suspend user accounts or access to Dragon Run at its discretion
            and without prior notice. Such termination may occur in the event of a violation of these Terms or for any
            other reason determined by EmpteaXYZ.
          </Typography>
          <Typography align="center" variant="body1" marginY={0.6} color={muiTheme.palette.text.secondary}>
            Amendments
          </Typography>
          <Typography align="center" variant="body2" color={muiTheme.palette.text.secondary}>
            EmpteaXYZ reserves the right to modify or update these Terms at any time. Significant changes will be
            communicated to users through prominent notifications or other means as determined by EmpteaXYZ. Users are
            responsible for reviewing the updated Terms, and continued use of Dragon Run constitutes acceptance of the
            modified Terms.
          </Typography>
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
