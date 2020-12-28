import React, { useEffect, useState } from "react";
// import mockData from "./mockData";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
  makeStyles
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: "100%"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <React.StrictMode>
        <Grid container justify="center">
          <Grid item xs={false}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    <img src={front_default} alt="" />
                  </Avatar>
                }
                title={`${id}. ${toFirstCharUppercase(name)}`}
              />
              <CardMedia
                className={classes.media}
                image={fullImageUrl}
                title={`${id} ${name}`}
              />
              <CardContent>
                <Typography variant="subtitle1">Pokemon Info</Typography>
                <Typography variant="body2">
                  {"Species: "}
                  <Link href={species.url}>{species.name} </Link>
                </Typography>
                <Typography variant="body2">Height: {height} </Typography>
                <Typography variant="body2" gutterBottom>
                  Weight: {weight}{" "}
                </Typography>
                <Typography variant="subtitle1">Types</Typography>
                {types.map((typeInfo) => {
                  const { type } = typeInfo;
                  const { name } = type;
                  return (
                    <Typography variant="body2" key={name}>
                      {" "}
                      {`${name}`}
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.StrictMode>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Grid container justify="center">
          <Grid item xs={false}>
            <Button variant="contained" onClick={() => history.push("/")}>
              back to pokedex
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Pokemon;
