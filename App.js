import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, Button, } from 'react-native';
import axios from 'axios';



const App = () => {
  const [schools, setSchools] = useState(['']);
  const [SAT, setSAT] = useState(['']);
  const [show, setShow] = useState(false);
  const [id, setID] = useState();

  useEffect(() => {
    axios.get('https://data.cityofnewyork.us/resource/s3k6-pzi2.json')
    .then((res) => {
      setSchools(res.data)
      
    })
    .catch((err) => {
      console.log(err)
    });
    axios.get('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    .then((res) => {
      setSAT(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])
  const handlePress = (id) => {
   
    setShow(!show);
  };

 
return (
  <SafeAreaView>
    
      
   
    
    
    <ScrollView>
   
    {schools.map((data, key) => {
      return (
      <><Text key={key}>School Name: {data['school_name']}</Text><Button onPress={() => handlePress(setID(data['dbn']))} title='SAT Scores'></Button>
      {id === data['dbn'] ? <><Text>SAT MATH: {SAT.filter((val) => val.dbn === id).map((filter) => filter['sat_math_avg_score'])}</Text><Text>SAT READING: {SAT.filter((val) => val.dbn === id).map((filter) => filter['sat_critical_reading_avg_score'])} </Text><Text>SAT WRITING: {SAT.filter((val) => val.dbn === id).map((filter) => filter['sat_writing_avg_score'])}</Text></> : null}
      </> )
    })}
    
  
   
    </ScrollView>
  </SafeAreaView>
)
};



export default App;
