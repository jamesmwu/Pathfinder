import React from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import SelectList from 'react-native-dropdown-select-list';


const Home = () => {
  
  const [selected, setSeelcted] = React.useState("");
  const data = [
    {key:'1', value:'Hip Hop'},
    {key:'2', value:'Rock'},
    {key:'3', value:'Kpop'},
    {key:'4', value:'Classical'},
    {key:'5', value:'Pop'},
    
  ];


  return (

    <View style={styles.container}>
        
      
      
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Pathfinder</Text>
      </View>
      
      <View style={styles.dropdownsAndTitles}>
        
        <View style={styles.titles}>
          <Text style={styles.leftSideTitles}>Genre</Text>
          <Text style={styles.leftSideTitles}>Artist</Text>
          <Text style={styles.leftSideTitles}>Date</Text>
          <Text style={styles.leftSideTitles}>Energy</Text>
          <Text style={styles.leftSideTitles}>Mood</Text>
          <Text style={styles.leftSideTitles}>Rhythm</Text>
        </View>

        <View style={styles.dropdowns}>
          <SelectList data={data} setSelected={setSeelcted} />
          <SelectList data={data} setSelected={setSeelcted} />
          <SelectList data={data} setSelected={setSeelcted} />
        </View>

        {/* <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider value={this.state.value}onValueChange={(value) => this.setState({ value })}/>
            <Text>Value: {this.state.value}</Text>
        </View>; */}
      
      </View>
      

      {/* <View style={styles.slidersAndTitlesOnRight}> */}
        {/* <Text style={styles.leftSideTitles}>Energy</Text>
        <Text style={styles.leftSideTitles}>Mood</Text>
        <Text style={styles.leftSideTitles}>Rhythm</Text> */}
        {/* <Text style={styles.rightSideTitles}>Energy</Text>
        <Text style={styles.rightSideTitles}>Mood</Text>
        <Text style={styles.rightSideTitles}>Rhythm</Text> */}
      {/* </View> */}

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


  dropdownsAndTitles:{
    flex: 3,
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // backgroundColor: '#ddd',

  },

  titles:{
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'space-evenly',
  },

  dropdowns:{
    flex: 1,
    // position: 'fixed', // <-- doesn't work
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
