import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Header from './Header';
import Card from './Card';
import recipesData from '../recipes.json';
import axios from 'axios';

const RECIPE_URL =
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState(recipesData);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(RECIPE_URL);
        setRecipes(data.meals);
        setIsLoading(false);

        console.log(data);
      } catch (error) {
        alert('No Internet Connection, Please connect to a network!');
        setIsLoading(false);
      }
    };

    getRecipes(); //
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          style={styles.flatList}
          data={recipes}
          renderItem={({item}) => <Card item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  black: {
    color: '#111',
  },
  loader: {
    padding: 100,
  },
});

export default Home;
