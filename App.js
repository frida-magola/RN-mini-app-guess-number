import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const DUMMY_DOMAINS = [
  {
    name: 'domain1',
    status_domain: 'active',
  },
  {
    name: 'domain3',
    status_domain: 'expired',
  },
  {
    name: 'domain2',
    status_domain: 'active',
  },
  {
    name: 'domain6',
    status_domain: 'active',
  },
];

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  // const [filterDomain, setFilterDomain] = useState([]);
  // const [domainName, setDomainName] = useState('');
  // const [isDomainClicked, setIsDomainClicked] = useState(false);

  // let filterDomains =
  //   DUMMY_DOMAINS && DUMMY_DOMAINS.length > 0
  //     ? DUMMY_DOMAINS.filter(
  //         (domain) => domain.status_domain.toLowerCase() === 'active'
  //       )
  //     : [];

  // useEffect(() => {
  //   setDomainName(filterDomains[0].name);
  // }, filterDomains);

  // const onDomainSelected = (domainValue) => {
  //   // console.log(domainValue);
  //   setDomainName(domainValue);
  //   // setFilterDomain([]);
  // };

  // console.log(deviceWidth, deviceHeight);

  // Fonts
  const [loaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // check if the fonts still loading
  if (!loaded) {
    return null;
  }

  function pickNumberHandler(pickNumber) {
    setUserNumber(pickNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function onRestartNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  // switch screens
  let screens = <StartGameScreen onPickNumber={pickNumberHandler} />;

  if (userNumber) {
    screens = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screens = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestartNewGame={onRestartNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screens}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
