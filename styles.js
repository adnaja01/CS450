import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f7f7f7',
  },
  sidebar: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selected: {
    backgroundColor: '#fff4e6',
    borderRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  balanceText: {
    fontSize: 12,
    marginTop: 4,
  },
  green: {
    color: '#2a9d8f',
  },
  red: {
    color: '#e76f51',
  },
  black: {
    color: '#333',
  },
  smallButton: {
    backgroundColor: '#f4a261',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#f4a261',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff4e6',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  splitForm: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#555',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#264653',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  pickerOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  pickerSelected: {
    backgroundColor: '#f4a261',
    borderColor: '#f4a261',
  },
  formButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  formButton: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 0,
  },
  closeButton: {
    backgroundColor: '#e76f51',
  },
});