import React from "react";
import {
  AppBar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Toolbar
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px"
  }
}));

const getPokemonCard = () => {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>This is a Pokemon Card.</CardContent>
      </Card>
    </Grid>
  );
};

const Pokedex = () => {
  const classes = useStyles();
  return (
    <React.StrictMode>
      <AppBar position="static">
        <Toolbar>Menu</Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.pokedexContainer}>
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
      </Grid>
    </React.StrictMode>
  );
};

export default Pokedex;
