import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 32,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5d3b23',
    marginTop: 4,
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: '#5d3b23',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#cfcfcf',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  signInButton: {
    backgroundColor: '#5d3b23',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#7a7a7a',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#aaa',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  signupContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#e07c00',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    margin: 10,
  },
  forgotPasswordText: {
    color: '#5d3b23',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});

export default styles;
