import React from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import SelectList from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import {StatusBar} from 'expo-status-bar';

const Home = () => {
  
  const [selected, setSeelcted] = React.useState("");
  const data = [
    {key:'1', value:'Hip Hop'},
    {key:'2', value:'Rock'},
    {key:'3', value:'Kpop'},
    {key:'4', value:'Classical'},
    {key:'5', value:'Pop'}
  ];

  const [range, setRange] = React.useState('50%');
  const [sliding, setSliding] = React.useState('Inactive');


  return (

    <View style={styles.container}>
      
      
      <Text style={{ fontSize:20, fontWeight: 'bold'}}>{range}</Text>
      <Text style={{ fontSize:20, fontWeight: 'bold'}}>{sliding}</Text>

      <Slider
        style ={{width: 250, height:40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='tomato'
        minimumTrackTineColor='#000'
        value={0.5}
        onValueChange={value => setRange(parseInt(value*100) + '%')}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      <Slider
        style ={{width: 250, height:40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='tomato'
        minimumTrackTineColor='#000'
        value={0.5}
        onValueChange={value => setRange(parseInt(value*100) + '%')}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      <Slider
        style ={{width: 250, height:40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='tomato'
        minimumTrackTineColor='#000'
        value={0.5}
        onValueChange={value => setRange(parseInt(value*100) + '%')}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      
      

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

      <StatusBar style= "auto" />
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
