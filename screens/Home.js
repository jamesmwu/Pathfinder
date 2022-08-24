import { View, Text, Picker, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    
      
        <View style={styles.container}>
            <Text>Hi</Text>
            
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>Pathfinder</Text>
            
              <TouchableOpacity style={styles.random} onPress={()=>
                console.log("Hi")
                }>
                <Text>BUTTON</Text>
              </TouchableOpacity>
              
              
            </View>

        </View>
    
    
  );
};

// <View style={style.container}></View>
/*
<View style={styles.random}>
  <Text>Hi</Text>
</View>
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer:{
    flex: 1,
    backgroundColor: "#7cb48f",
    alignItems: "flex-start",
    justifyContent: "top",
    flexDirection: 'center',
    marginTop: 50,
    marginBottom: 725,
    marginRight: 150,
  },

  
  random:{
    backgroundColor: "#45edea",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'black',
    borderWidth: 2,
  },
  
  
  appTitle: {
    fontSize: 35,
    fontWeight: 'bold',

  },
  
});

export default Home;
