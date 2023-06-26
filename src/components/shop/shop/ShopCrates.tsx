import React from 'react';
import { useTheme, Grid, Typography, Box } from '@mui/material';
import { SquareButton } from 'components/styled/SquareButton';
import shopItems from 'components/fake-data/shopItems';
import ShopItem from './ShopItem';

export default function ShopCrates() {
  const muiTheme = useTheme();
  return (
    <>
      <Grid item xs={12}>
        <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3">
          Crates
        </Typography>
      </Grid>
      {shopItems.crates.map((crate) => (
        <ShopItem name={crate.name} image={crate.image} key={crate.name}>
          <Box
            sx={{
              width: '100%',
              pt: '90%',
              position: 'relative',
              [muiTheme.breakpoints.up('md')]: {
                pt: '100%'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                maxHeight: '100%',
                margin: 2.5,
                mt: 0,
                [muiTheme.breakpoints.up('md')]: {
                  mt: 0.5,
                  mr: 2,
                  mb: 3,
                  ml: 0
                }
              }}
            >
              <Typography variant="body1" color={muiTheme.palette.text.secondary}>
                Description:
              </Typography>
              <Typography variant="body2" pb={0.4} color={muiTheme.palette.text.secondary}>
                {crate.description}
              </Typography>
              <Typography variant="body2" color={muiTheme.palette.text.secondary}>
                Expires: {crate.expiry}
              </Typography>
              <Typography variant="body2" color={muiTheme.palette.text.secondary}>
                Price: {crate.price}
              </Typography>
              <SquareButton
                sx={{ position: 'absolute', bottom: 0 }}
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
              >
                <Typography variant="h6">Buy</Typography>
              </SquareButton>
            </Box>
          </Box>
        </ShopItem>
      ))}
    </>
  );
}
