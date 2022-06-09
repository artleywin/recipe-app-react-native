import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import axios from 'axios';

const Details = ({route, navigation}) => {
  const {mealId} = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        );
        setRecipe(data.meals[0]);
        setIsLoading(false);

        console.log(data);
      } catch (error) {
        alert('No Internet Connection, Please connect to a network!');
        setIsLoading(false);
      }
    };

    getRecipe(); //
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <ScrollView>
          <View style={styles.listItemView}>
            <Image
              source={{uri: recipe.strMealThumb}}
              style={styles.imgThumbnail}
            />
            <Text style={styles.listItemName}>{recipe.strMeal}</Text>
            <Text style={styles.listItemTags}>
              ({!recipe.strTags ? 'Chicken' : recipe.strTags})
            </Text>

            <Text style={styles.listItemText}>Instructions:</Text>
            <Text
              style={styles.listItemYT}
              onPress={() => Linking.openURL(recipe.strYoutube)}>
              {recipe.strYoutube}
            </Text>
            <Text style={styles.listBodyText}>{recipe.strInstructions}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    padding: 0,
    paddingTop: 30,
    fontSize: 18,
    color: '#111',
    fontWeight: 'bold',
  },
  listItemName: {
    padding: 0,
    paddingTop: 30,
    fontSize: 18,
    color: '#7f03bc',
    fontWeight: 'bold',
  },
  listItemTags: {
    padding: 1,
    paddingBottom: 30,
    fontSize: 15,
    color: '#111',
    fontStyle: 'italic',
  },
  listItemYT: {
    padding: 0,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 18,
    color: '#1a28ef',
    fontWeight: 'bold',
  },
  listBodyText: {
    padding: 0,
    paddingHorizontal: 15,
    paddingTop: 5,
    fontSize: 18,
    color: '#111',
    fontStyle: 'normal',
  },
  imgThumbnail: {
    width: '100%',
    height: 200,
    paddingBottom: 10,
  },
  loader: {
    padding: 100,
  },
  container: {
    flex: 1,
  },
});

export default Details;
