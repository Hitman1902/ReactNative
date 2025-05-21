import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: 'gray',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CBC3E3',
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
  },
  icon: {
    marginRight: 15,
    color: 'black',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
