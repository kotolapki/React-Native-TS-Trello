import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../redux/rootReducer';
import {selectIsLoading} from '../../redux/selectors';
import {navigate} from '../../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Authorization() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const [hasUserRegistered, setHasUserRegistered] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('name');

      if (token && name) {
        dispatch(actions.signInSuccess({name, token}));
        navigate('Main');
      }
    }

    fetchToken();
  }, [dispatch]);

  function OnPressHandler() {
    hasUserRegistered
      ? dispatch(actions.signIn({email, password}))
      : dispatch(actions.signUp({email, username, password}));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        textContentType="emailAddress"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {!hasUserRegistered && (
        <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            textContentType="username"
            placeholder="name"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </>
      )}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        textContentType="newPassword"
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.submitBtnsWrapper}>
        <TouchableOpacity style={styles.submitBtn} onPress={OnPressHandler}>
          <Text style={styles.submitBtnText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeHasUserRegisteredBtn}
          onPress={() => setHasUserRegistered((prev) => !prev)}>
          <Text style={styles.submitBtnText}>
            {hasUserRegistered ? 'Sign up' : 'Sing in'}
          </Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={isLoading} textContent={'Loading...'} />
    </View>
  );
}

export default Authorization;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    marginBottom: 20,
    paddingBottom: 5,
    minWidth: 100,
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  submitBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitBtn: {
    marginRight: 10,
    paddingVertical: 10,
    minWidth: 130,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  changeHasUserRegisteredBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: 130,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  submitBtnText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    textTransform: 'uppercase',
  },
});
