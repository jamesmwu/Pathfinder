import React from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import SelectList from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import {StatusBar} from 'expo-status-bar';

const Home = () => {
  
  const [selected, setSeelcted] = React.useState("");
  // COULD import the genres from dataset somehow but typing them out is also possible
  const genres = [
    {key:'1', value:'Hip Hop'},
    {key:'2', value:'Rock'},
    {key:'3', value:'Kpop'},
    {key:'4', value:'Classical'},
    {key:'5', value:'Pop'}
  ];

  // not sure how but we probably gotta import artists from a data list
  const artists = [
    {key:'1', value:'Michael'},
    {key:'2', value:'Jason'},
    {key:'3', value:'James'},
  ];

  const dates = [
    {key:'1', value:'January'},
    {key:'2', value:'February'},
    {key:'3', value:'March'},
    {key:'4', value:'April'},
    {key:'5', value:'May'},
    {key:'6', value:'June'},
    {key:'7', value:'July'},
    {key:'8', value:'August'},
    {key:'9', value:'September'},
    {key:'10', value:'October'},
    {key:'11', value:'November'},
    {key:'12', value:'December'},

  ];

  const [range, setRange] = React.useState('50%');
  const [sliding, setSliding] = React.useState('Inactive');


  return (

    <View style={styles.container}>
      
      {/* comment out when ont using (only used for sliders and testing but visually it doesn't need to be seen) */}
      {/* <Text style={{ fontSize:20, fontWeight: 'bold'}}>{range}</Text>
      <Text style={{ fontSize:20, fontWeight: 'bold'}}>{sliding}</Text> */}

      
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Pathfinder</Text>
      </View>
      
      <View style={styles.dropdownsAndTitlesAndSliders}>
        
        <View style={styles.titles}>
          <Text style={styles.leftSideTitles}>Genre</Text>
          <Text style={styles.leftSideTitles}>Artist</Text>
          <Text style={styles.leftSideTitles}>Date</Text>
          <Text style={styles.leftSideTitles}>Energy</Text>
          <Text style={styles.leftSideTitles}>Mood</Text>
          <Text style={styles.leftSideTitles}>Rhythm</Text>
        </View>

        <View style={styles.dropdownsAndSliders}>
          {/* below are the dropdowns */}
          <SelectList data={genres} setSelected={setSeelcted} />
          <SelectList data={artists} setSelected={setSeelcted} />
          <SelectList data={dates} setSelected={setSeelcted} />

          {/* below are the sliders */}
          <Slider
            style ={{width: 190, height:40}}
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
            style ={{width: 190, height:40}}
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
            style ={{width: 190, height:40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor='tomato'
            minimumTrackTineColor='#000'
            value={0.5}
            onValueChange={value => setRange(parseInt(value*100) + '%')}
            onSlidingStart={() => setSliding('Sliding')}
            onSlidingComplete={() => setSliding('Inactive')}
          />
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


// NOTE: ALL THE COLORS USED HERE ARE SOLELY FOR VISUALIZING THE CONTAINERS 
// at least for now they are
// I haven't made any actual color choice decisions besides mayb the recommend button color and the slider colors
// but even then they are still all subject to change

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
    // marginRight: 180, // <-- just makes the container smaller by cutting off the space on the right
    
  },


  dropdownsAndTitlesAndSliders:{
    flex: 3,
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // backgroundColor: '#ddd',

  },

  titles:{
    flex: 1,
    // backgroundColor: '#ddd',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
  },

  dropdownsAndSliders:{
    flex: 1,
    // position: 'fixed', // <-- doesn't work
    justifyContent: 'space-evenly',
    // backgroundColor: '#ddd',
    marginRight: 10,
  },

  leftSideTitles:{
    flexDirection: 'flex-start',
    paddingLeft: 25,
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
