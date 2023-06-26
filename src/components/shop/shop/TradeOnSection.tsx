import React from 'react';
import { Grid, Typography } from '@mui/material';
import { magicEden, tensor } from '@consts/Links';
import magicedenLogo from '@assets/magiceden.png';
import tensorLogo from '@assets/tensor.png';
import ExchangeItem from './ExchangeItem';

export default function TradeOnSection() {
  const exchanges = [
    {
      name: 'Tensor',
      link: tensor,
      logo: tensorLogo,
      primaryColor: '#8EE3FB',
      secondaryColor: '#1C1C1C'
    },
    {
      name: 'MagicEden',
      link: magicEden,
      logo: magicedenLogo,
      primaryColor: '#E42575',
      secondaryColor: '#1C1C1C'
    }
  ];
  return (
    <>
      <Grid item xs={12}>
        <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3">
          Trade
        </Typography>
      </Grid>
      {exchanges.map((exchange) => (
        <ExchangeItem
          name={exchange.name}
          image={exchange.logo}
          link={exchange.link}
          key={exchange.name}
          primaryColor={exchange.primaryColor}
          secondaryColor={exchange.secondaryColor}
        />
      ))}
    </>
  );
}
