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
import {signIn, signUp} from '../../redux/actions';
import {selectIsLoading} from '../../redux/selectors';
import {navigate} from '../../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInSuccess} from '../../redux/actions';

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
        dispatch(signInSuccess(name, token));
        navigate('Main');
      }
    }

    fetchToken();
  }, [dispatch]);

  function onSubmit() {
    hasUserRegistered
      ? dispatch(signIn(email, password))
      : dispatch(signUp(email, username, password));
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
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitBtnText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => setHasUserRegistered((prev) => !prev)}>
        <Text style={styles.submitBtnText}>
          {hasUserRegistered ? 'Sign up' : 'Sing in'}
        </Text>
      </TouchableOpacity>
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
  submitBtn: {
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textTransform: 'uppercase',
  },
});
