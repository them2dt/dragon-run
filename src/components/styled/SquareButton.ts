import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const SquareButton = styled(Button)((props) => ({
  borderRadius: "0",
  color: props.theme.palette.text.secondary,
  background: props.theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: props.theme.palette.text.secondary,
    color: props.theme.palette.secondary.main
  }
}));
