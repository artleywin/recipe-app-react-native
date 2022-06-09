import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Card = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('Details', {mealId: item.idMeal});
      }}>
      <View style={styles.listItemView}>
        <Image source={{uri: item.strMealThumb}} style={styles.imgThumbnail} />
        <Text style={styles.listItemText}>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
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
    padding: 30,
    fontSize: 18,
    color: '#111',
    fontStyle: 'italic',
  },
  imgThumbnail: {
    width: '100%',
    height: 200,
    paddingBottom: 10,
  },
});

export default Card;
