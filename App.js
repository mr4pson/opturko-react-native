import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { AuthContext } from "./context";

import axios from "axios";
import Auth from "./screens/Auth";
import Categories from "./screens/Categories";
import { BASE_URL } from "./constants/endpoint";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  const [languages, setLanguages] = React.useState([]);
  const [translations, setTranslations] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  const translation = Object.entries(translations ?? {}).reduce(
    (accum, [key, translation]) => {
      try {
        Object.entries(JSON.parse(translation.toString() ?? "''")).forEach(
          ([lang, value]) => {
            if (!accum[lang]) {
              accum[lang] = {};
            }

            accum[lang][key] = value;
          }
        );
      } catch (error) {
        console.log(error);
      }

      return accum;
    },
    {}
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log("Restoring failed");
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();

    (async () => {
      const languageResponse = await axios.get(`${BASE_URL}/languages`);
      setLanguages(languageResponse.data);

      const translationsResponse = await axios.get(`${BASE_URL}/translations`);
      setTranslations(translationsResponse.data);

      setLoading(false);
    })();
  }, []);

  const authContext = {
    signIn: async (payload) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, payload);

        dispatch({ type: "SIGN_IN", token: response.data.accessToken });
      } catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          Toast.show({
            type: "error",
            text1: "Ошибка",
            text2: "Неверный логин или пароль.",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Ошибка сервера",
            text2: "Обратитесь к администратору.",
          });
        }
      }
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    },
  };

  // if (!loaded) return null;

  return !loading ? (
    <>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Auth"
          >
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen
                name="Splash"
                component={Categories}
                initialParams={{ languages, translation }}
              />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{
                  title: "Sign in",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
                initialParams={{ languages, translation }}
              />
            ) : (
              // User is signed in
              <Stack.Screen
                name="Details"
                component={Categories}
                initialParams={{ languages, translation }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
      <Toast />
    </>
  ) : (
    <></>
  );
};

export default App;
