import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const ChooseCharacterPaper = styled(Paper)((props) => ({
  borderRadius: '0',
  padding: '1rem',
  height: 260,
  elevation: 12,
  background: props.theme.palette.background.light,
  [props.theme.breakpoints.up('sm')]: {
    height: 300
  },
  [props.theme.breakpoints.up('md')]: {
    height: 400
  },
  [props.theme.breakpoints.up('lg')]: {
    height: 400
  }
}));
