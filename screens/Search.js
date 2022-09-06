import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ScrollView, StatusBar} from "react-native";
import React from 'react';

 
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Search = () => {

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View style={styles.container}>
      {/* <Text>This the search screen</Text> */}

      <View style={styles.searchBarContainer}>
        
      </View>

      {/* <SafeAreaView style={styles.recommendedSongsContainer}>
        <ScrollView style={styles.scrollView}>
          
        </ScrollView>
      </SafeAreaView> */}

      {/* MICHAEL'S NOTE: idk how to use ScrollView cuz even with it commented out the FlatList scrolls ¯\_(ツ)_/¯ */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      {/* this is the 'random' button */}
      <SafeAreaView style={styles.randomButtonContainer}>
        <TouchableOpacity style={styles.randomButton} onPress={()=>
            console.log("random button pressed")
            }>
            <Text style={{ fontSize: 20}}>RANDOM</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 180,
  },

  searchBarContainer: {
    flex: 1,
  },

  recommendedSongsContainer: {
    flex: 3,
    backgroundColor: "#f9c2ff",
    alignItems: 'center',
    justifyContent: 'center',

  },


  randomButtonContainer: {
    // backgroundColor: "#ddd",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  randomButton:{
    backgroundColor: '#45edea',
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Search;
