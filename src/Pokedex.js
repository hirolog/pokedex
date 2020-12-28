import React, { useState } from "react";
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  fade,
  Grid,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import mockData from "./mockData";
import { toFirstCharUppercase } from "./constants";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px"
  },
  cardMedia: {
    margin: "auto"
  },
  cardContent: {
    textAlign: "center"
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px"
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px"
  },
  searchInput: {
    width: "200px",
    margin: "5px"
  }
}));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);

  const getPokemonCard = (pokemonId) => {
    const { id, name } = pokemonData[`${pokemonId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>{" "}
        </Card>
      </Grid>
    );
  };

  return (
    <React.StrictMode>
      <AppBar position="static">
        <Toolbar>Menu</Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={3} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) =>
            getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </React.StrictMode>
  );
};

export default Pokedex;
