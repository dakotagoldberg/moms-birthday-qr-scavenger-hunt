import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, FlatList, Alert, Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from './assets/logo.png';


// let globalFinds = [];
let globalCatches = [];
let dataSet = ['0ce902b3dd98d5e89026f2b589ca16ff', 'ea3c7cc6cc89b9eb86d9d96fd000b37c', 'f4cb481edb523ccd069e775c64420b7f', 'e0643a25527a51e6e8120bc4888ed110', 'ab27e9cc858a8a7886b77daec38a8513', '1945053b5520726fdf570fa691b46aa6', 'f0a05ad936926cc286250df83e8fefe1', '05fb9df94df95a33752158886c1d2889', '44cb8048ccc9ea0e9b117fa5ceb64b2c', '545675d5e0ea099a22cc59e642c62a7a', '20d17a54906033bdd72d40afb8acab04', '381bc5739d5af610959d563795d207e1', '3a0f22b4be50ca124734f395f50911f9', '2b7d3ab2bcf53429b135a8e65ed1011a'];
// for testing: 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'

const DATA = [
  {
    id: '0ce902b3dd98d5e89026f2b589ca16ff',
    title: '🔑 Rare Denise Key',
    color: '#3d9ff5',
    hint: 'hint here!',
  },
  {
    id: 'ea3c7cc6cc89b9eb86d9d96fd000b37c',
    title: '🍬 Birthday Candy',
    color: '#ffa8ff',
    hint: 'yass',
  },
  {
    id: 'f4cb481edb523ccd069e775c64420b7f',
    title: '🐬 It Jumps out of the Water',
    color: '#98e2ed',
    hint: 'okey',
  },
  {
    id: 'e0643a25527a51e6e8120bc4888ed110',
    title: '🌻 Sunflower',
    color: '#f2cd44',
    hint: 'okey',
  },
  {
    id: 'ab27e9cc858a8a7886b77daec38a8513',
    title: '🐏 Wild Ram',
    color: '#BDBDB5',
    hint: 'okey',
  },
  {
    id: '1945053b5520726fdf570fa691b46aa6',
    title: '⛈ Stormy',
    color: '#A9B9C7',
    hint: 'okey',
  },
  {
    id: 'f0a05ad936926cc286250df83e8fefe1',
    title: '🍦 Soft Serve',
    color: '#cfc8b0',
    hint: 'okey',
  },
  {
    id: '05fb9df94df95a33752158886c1d2889',
    title: '🛌 Sleep?',
    color: '#9ebee6',
    hint: 'okey',
  },
  {
    id: '44cb8048ccc9ea0e9b117fa5ceb64b2c',
    title: '🍕 Pizza with No Sauce',
    color: '#de7468',
    hint: 'okey',
  },
  {
    id: '545675d5e0ea099a22cc59e642c62a7a',
    title: '💎 Aquamarine',
    color: '#8cd3fa',
    hint: 'okey',
  },
  {
    id: '20d17a54906033bdd72d40afb8acab04',
    title: '☔️ Rainy Vacation',
    color: '#ca9cf7',
    hint: 'okey',
  },
  {
    id: '381bc5739d5af610959d563795d207e1',
    title: '🥨 Pretzel Token',
    color: '#d1b190',
    hint: 'okey',
  },
  {
    id: '3a0f22b4be50ca124734f395f50911f9',
    title: '🌱 Spring has Sprung',
    color: '#a0e861',
    hint: 'okey',
  },
  {
    id: '2b7d3ab2bcf53429b135a8e65ed1011a',
    title: '🏀 March Madness',
    color: '#f5ad69',
    hint: 'okey',
  },
];


function checkIfFound(id) {
  if (globalCatches.includes(id)) {
    return true;
  }
  else {
    return false;
  }
  
}

function Item({ title, found, id, color, hint }) {
  found = checkIfFound(id);
  if (found) {
    return (
      <View style={[styles.item, {backgroundColor: `${color}`,}]}>
        <TouchableOpacity>
          <Text style={[styles.title, {color: '#fff',}]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  else {
    return (
      <View style={[styles.item, styles.undiscovered]}>
        <TouchableOpacity onPress={() => Alert.alert("Hint!", `${hint}`)}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{height: 200, width: 200,}} source={logo}/>
      <Text style={{fontSize:18, fontWeight:'bold', marginTop:5,}}>Happy Birthday Mom!</Text>
      <Text style={{marginBottom:10,}}>Welcome to your scavenger hunt!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.navButton}>
        <Text style={styles.navButtonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Library')} style={styles.navButton}>
        <Text style={styles.navButtonText}>Library</Text>
      </TouchableOpacity>
    </View>
  );
}

function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Click an undiscovered item for a hint!</Text> */}
    <FlatList
      data={DATA}
      renderItem={({ item }) => 
      <Item 
        id={item.id} 
        color={item.color} 
        found={item.found} 
        title={item.title} 
        hint={item.hint} 
        />}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
  );
}


const Stack = createStackNavigator();

function Camera({ navigation })  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  if (globalCatches.length === dataSet.length) {
    Alert.alert(
      'Congratulations!',
      'You have found all the items!',
      [
        {text: 'Yay!', onPress: () => console.log('Yay pressed')},
        {text: 'View Items', onPress: () => navigation.navigate('Library'), style: 'default'},
        {text: 'Reset Progress', onPress: () => globalCatches = [], style: 'destructive'},
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (dataSet.includes(data) && !(globalCatches.includes(data))) {
      globalCatches.push(data);
      Alert.alert(
        'You discovered a new item!',
        `${data}`,
        [
          {text: 'View in Library', onPress: () => navigation.navigate('Library')},
          {
            text: 'Keep Scanning',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
    else if (globalCatches.includes(data)) {
      Alert.alert("You've already found this item!");
    }
    else {
      Alert.alert("This is a QR Code, but it's not part of the game!");
    }
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
        <Text style={styles.scanButtonText}>Scan Code</Text>
      </TouchableOpacity>

    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ title: 'Library' }}
      />
        <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ 
          title: 'Camera',
          headerRight: () => (
            <Button
              onPress={() => alert('Find a barcode and press the Scan Code button.')}
              title="Help"
              color="#111"
            />
          ),
        }}
        
      />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
  },
  discovered: {
    backgroundColor: 'red',
  },
  undiscovered: {
    backgroundColor: '#e8e8e8',
  },
  scanButton: {
    alignSelf: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 3,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  navButton: {
    // backgroundColor: '#2A73EC',
    borderColor: '#222',
    borderWidth: 3,
    marginBottom: 0,
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#222',
    fontSize: 18,
  },
});


export default App;