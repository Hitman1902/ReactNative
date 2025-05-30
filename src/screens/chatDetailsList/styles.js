import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // chatContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  //   backgroundColor: '#f9f9f9',
  // },
  // avatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   marginRight: 10,
  // },
  // name: {
  //   fontSize: 16,
  //   fontWeight: '600',
  //   color: '#000',
  // },
  // status: {
  //   fontSize: 12,
  //   color: 'green',
  // },
  // messageContainer: {
  //   maxWidth: '75%',
  //   padding: 10,
  //   marginVertical: 5,
  //   borderRadius: 10,
  // },
  // left: {
  //   alignSelf: 'flex-start',
  //   backgroundColor: '#f1f1f1',
  //   borderTopLeftRadius: 0,
  // },
  // right: {
  //   alignSelf: 'flex-end',
  //   backgroundColor: '#CBC3E3',
  //   borderTopRightRadius: 0,
  // },
  // messageText: {
  //   fontSize: 15,
  //   color: '#000',
  // },
  // messageBubble: {
  //   padding: 12,
  //   borderRadius: 12,
  //   borderTopLeftRadius: 0,
  // },
  // messageTime: {
  //   fontSize: 11,
  //   color: '#888',
  //   textAlign: 'right',
  //   marginTop: 4,
  // },
  // inputBar: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   backgroundColor: '#fff',
  //   borderTopWidth: 1,
  //   borderTopColor: '#eee',
  // },
  // input: {
  //   flex: 1,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#f1f1f1',
  //   paddingHorizontal: 15,
  //   fontSize: 15,
  //   marginRight: 10,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  messagesContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 80,
  },
  messageWrapper: {
    width: '100%',
    paddingHorizontal: 5,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    padding: 8,
  },
});
