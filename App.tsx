import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './src/redux/rootReducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authorization from './src/components/Authorization';
import Main from './src/components/Main';
import {sagaWatcher} from './src/redux/sagas';
import Error from './src/components/Error';
import {navigationRef} from './src/services/NavigationService';
import Desk from './src/components/Desk';
import DeskSettings from './src/components/DeskSettings';
import TaskSettings from './src/components/TaskSettings';
import CommentSettings from './src/components/CommentSettings';
import TaskScreen from './src/components/TaskScreen';

const Stack = createStackNavigator();
const saga = createSagaMiddleware();

const middleware = [saga, thunk];

export const store = configureStore({
  reducer: rootReducer.reducer,
  middleware,
});

saga.run(sagaWatcher);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Autorization"
            component={Authorization}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Desk"
            component={Desk}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TaskScreen"
            component={TaskScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DeskSettings"
            component={DeskSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TaskSettings"
            component={TaskSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CommentSettings"
            component={CommentSettings}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
