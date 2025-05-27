import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    opacity: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 200,
  },
  text: {
    marginTop: 10,
    color: '#FFD300',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Login: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFD300',
    height: 70,
    width: '95%',
    marginLeft: 15,
  },
  Signup: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'black',
    height: 70,
    width: '95%',
    marginLeft: 15,
  },
});

export default styles;
