import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const ChooseCharacterPaper = styled(Paper)((props) => ({
  borderRadius: '0',
  background: props.theme.palette.background.light
}));
