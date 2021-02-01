import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewDesk,
  fetchDesksRequest,
  fetchTasksRequest,
} from '../../redux/actions';
import {selectDesks, selectIsLoading} from '../../redux/selectors';
import AddField from '../AddField';

function Main() {
  const [titleInput, setTitleInput] = useState('');
  const [isDeskTitleInputVisible, setIsDeskTitleInputVisible] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDesksRequest());
  }, [dispatch]);

  const desks = useSelector(selectDesks);

  function addNewDeskHandler() {
    setIsDeskTitleInputVisible(false);
    dispatch(addNewDesk(titleInput));
    setTitleInput('');
  }

  return (
    <ScrollView
      onTouchStart={() => setIsDeskTitleInputVisible(false)}
      style={styles.root}>
      <View>
        <Text style={styles.title}>My Desk</Text>
        {!isDeskTitleInputVisible && (
          <View style={styles.addNewDeskBtnWrapper}>
            <TouchableOpacity
              style={styles.addNewDeskBtn}
              onPress={() => setIsDeskTitleInputVisible(true)}>
              <ImageBackground
                source={require('../../assets/img/addBtn.png')}
                style={styles.addNewDeskBtnBg}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.mainContainer}>
        {isDeskTitleInputVisible && (
          <AddField
            initialValue={titleInput}
            placeholder={'Enter desk name...'}
            onChangeHandler={setTitleInput}
            onPressHandler={addNewDeskHandler}
          />
        )}
        {desks.map((desk, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.desk}
              onPress={() => dispatch(fetchTasksRequest(desk.id))}>
              <Text style={styles.deskTitle}>{desk.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Spinner visible={isLoading} textContent={'Loading...'} />
    </ScrollView>
  );
}

export default Main;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  title: {
    paddingVertical: 22,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  addNewDeskBtnWrapper: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 24,
    right: 15,
  },
  addNewDeskBtn: {
    width: 16,
    height: 16,
  },
  addNewDeskBtnBg: {
    width: 16,
    height: 16,
  },
  mainContainer: {
    padding: 15,
  },
  desk: {
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
  },
  deskTitle: {
    fontSize: 17,
  },
});
