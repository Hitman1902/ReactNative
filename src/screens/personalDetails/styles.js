import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#CBC3E3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#CBC3E3',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
  },
});

export default styles;
