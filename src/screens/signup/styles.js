import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    marginTop: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  label: {
    color: '#aaa',
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#aaa',
    marginLeft: 5,
  },
  forgotText: {
    color: '#aaa',
    textDecorationLine: 'underline',
  },
  loginButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  socialText: {
    color: '#fff',
    marginLeft: 10,
  },
  signupText: {
    color: '#aaa',
    textAlign: 'center',
  },
  signupLink: {
    color: '#4c6ef5',
    fontWeight: 'bold',
  },
});

export default styles;
