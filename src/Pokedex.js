import React, { useEffect, useState } from "react";
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
// import mockData from "./mockData";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "30px",
    paddingRight: "30px"
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
  },
  hover: {
    "&:hover": {
      background: "#fdd",
      cursor: "pointer"
    }
  }
}));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={6} sm={4} key={pokemonId}>
        <Card
          onClick={() => history.push(`/${pokemonId}`)}
          className={classes.hover}
        >
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
        <Grid container spacing={2} className={classes.pokedexContainer}>
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
