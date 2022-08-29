import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
// import {Colors} from ;
// Users/19099/Documents/GitHub/Pathfinder/Colors.js;

const Search = () => {
  return (
    <View style={styles.container}>
      {/* <Text>This the search screen</Text> */}

      <View style={styles.searchBarContainer}>
        
      </View>

      <View style={styles.recommendedSongsContainer}>
        <Text>Something here for now</Text>
      </View>

      {/* this is the 'random' button */}
      <SafeAreaView style={styles.randomButtonContainer}>
        <TouchableOpacity style={styles.randomButton} onPress={()=>
            console.log("random button pressed")
            }>
            <Text style={{ fontSize: 20}}>Random</Text>
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
    paddingTop: 50,
    paddingBottom: 180,
  },

  searchBarContainer: {
    flex: 1,
  },

  recommendedSongsContainer: {
    flex: 3,
    backgroundColor: "#ddd",
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
});

export default Search;
