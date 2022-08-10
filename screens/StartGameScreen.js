import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const { width, height } = useWindowDimensions();

  function numberInputHandler(number) {
    setEnteredNumber(number);
  }

  function addNumberInputHandler() {
    // console.log('Adding number input handler');
    // Checking the validation of the number entered
    const choosenNumber = parseInt(enteredNumber);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      // show alert....
      Alert.alert(
        'Invalid number !',
        'Number has to be a number between 1 and 99.',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetNumberInputHandler,
          },
        ]
      );

      return;
    }

    // Valide Number
    onPickNumber(enteredNumber);
  }

  function resetNumberInputHandler() {
    setEnteredNumber('');
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootScreen, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card style={styles.inputContainer}>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.inputNumber}
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredNumber}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.actionContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetNumberInputHandler}>
                  Reset
                </PrimaryButton>
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={addNumberInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
    margin: 16,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },

  inputNumber: {
    height: 50,
    width: 50,
    fontSize: 32,
    color: Colors.accent500,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});
