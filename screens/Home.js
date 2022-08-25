import { View, Text, Picker, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

const Home = () => {
  return (
    
      
        <View style={styles.container}>
            
            
            <View style={styles.titleContainer}>
              <Text style={{fontSize: 35, fontWeight: 'bold'}}>Pathfinder</Text>
            </View>
            
            <View style={styles.dropdownsAndTitlesOnLeft}>
              <Text style={styles.leftSideTitles}>Genre</Text>
              <Text style={styles.leftSideTitles}>Artist</Text>
              <Text style={styles.leftSideTitles}>Date</Text>
            </View>

            <View style={styles.slidersAndTitlesOnRight}>
              <Text style={styles.rightSideTitles}>Energy</Text>
              <Text style={styles.rightSideTitles}>Mood</Text>
              <Text style={styles.rightSideTitles}>Rhythm</Text>
            </View>

            <SafeAreaView style={styles.recommendButtonContainer}>
              <TouchableOpacity style={styles.recommendButton} onPress={()=>
                  console.log("Hi")
                  }>
                  <Text style={{ fontSize: 20}}>RECOMMEND</Text>
              </TouchableOpacity>
            </SafeAreaView>



        </View>
    
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 180,
    // alignItems: "center",
    // justifyContent: "center",
  },

  titleContainer:{
    flex: 1,
    // backgroundColor: "#7cb48f",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: 'flex-start',
    padding: 10,
    
  },


  dropdownsAndTitlesOnLeft:{
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',

  },

  leftSideTitles:{
    flexDirection: 'flex-start',
    paddingLeft: 25,
    fontSize: 30,
    // fontWeight: 'bold'
  },


  slidersAndTitlesOnRight:{
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',

  },

  rightSideTitles:{
    alignItems: 'flex-end',
    paddingRight: 25,
    fontSize: 30,
    // fontWeight: 'bold'
  },


  recommendButtonContainer:{
    // backgroundColor: "#ddd",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: 'black',
    // borderWidth: 2,
    padding:20,
    
  },

  recommendButton:{
    backgroundColor: "#45edea",
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

export default Home;
