import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import NumberContainer from '../components/game/NumberConatiner';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

// Generating random number function helper
function regeneteRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return regeneteRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minNumber = 1;
let maxNumber = 100;

function GameScreen({ userNumber, onGameOver }) {
  // console.log(userNumber);

  const initialNumber = regeneteRandomBetween(1, 100, userNumber);
  const [currentGuessNumber, setCurrentGuessNumber] = useState(initialNumber);
  const [guessRounds, setGuessRounds] = useState([initialNumber]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuessNumber == userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuessNumber, userNumber, onGameOver]);

  useEffect(() => {
    minNumber = 1;
    maxNumber = 100;
  }, []);

  function nextGuessNumberHandler(direction) {
    //lower or greater

    if (
      (direction === 'lower' && currentGuessNumber < userNumber) ||
      (direction === 'greater' && currentGuessNumber > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxNumber = currentGuessNumber;
    } else {
      minNumber = currentGuessNumber + 1;
    }

    const newRndGuess = regeneteRandomBetween(
      minNumber,
      maxNumber,
      currentGuessNumber
    );
    setCurrentGuessNumber(newRndGuess);
    setGuessRounds((prevGuessRound) => [newRndGuess, ...prevGuessRound]);
  }

  const guessRoundsLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuessNumber}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        {/* + - BUTTONS */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessNumberHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" color={'white'} size={24} />
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessNumberHandler.bind(this, 'greater')}
            >
              <Ionicons name="md-add" color={'white'} size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.landscapeStyle}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessNumberHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" color={'white'} size={24} />
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuessNumber}</NumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessNumberHandler.bind(this, 'greater')}
            >
              <Ionicons name="md-add" color={'white'} size={24} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.gameSCreenContainer}>
      <Title> Opponent's Guess</Title>
      {/* GUESS components */}

      {content}

      {/* <View>LOG ROUNDS</View> */}
      <View style={styles.listItemContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundsLength - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
    // <View style={styles.gameSCreenContainer}>
    //   <View style={{ flex: 1, justifyContent: 'center' }}>
    //     <TextInput
    //       placeholder={value.toLowerCase()}
    //       value={value}
    //       //   onChangeText={filterDomains}
    //     />
    //     <FlatList
    //       data={data}
    //       renderItem={({ item, index }) => (
    //         <Pressable
    //           onPress={() => onDomainSelected(item.name)}
    //           style={styles.item}
    //         >
    //           <Text style={styles.title}>
    //             {item.name || ''} | {item.status_domain || ''}
    //           </Text>
    //         </Pressable>
    //       )}
    //       keyExtractor={(item) => item.name}
    //     />
    //   </View>
    // </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  gameSCreenContainer: {
    flex: 1,
    // marginHorizontal: 40,
    marginTop: 40,
    alignItems: 'center',
  },

  instructionText: {
    marginBottom: 12,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listItemContainer: {
    flex: 1,
    padding: 16,
  },
  landscapeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
