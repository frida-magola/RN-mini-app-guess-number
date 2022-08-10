import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: Dimensions.get('window').width < 380 ? 20 : 36,
    padding: 16,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#4e0329",
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, //for shadows only android devices
    shadowColor: 'black', // for ios shadows
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
