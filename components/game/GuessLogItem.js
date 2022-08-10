import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItemGuess}>
      <Text style={styles.textGuess}>#{roundNumber}</Text>
      <Text style={styles.textGuess}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  listItemGuess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWith: 1,
    borderRadius: 40,
    borderColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    width: '100%',
    backgroundColor: Colors.accent500,
    marginVertical: 12,
  },

  textGuess: {
    fontFamily: 'open-sans',
  },
});
