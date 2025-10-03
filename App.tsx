/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//@ts-ignore-error

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/functions/CartContext';
import LoginScreen from './src/screen/login';
import ProductList from './src/screen/productList';
import ProductDetail from './src/screen/productDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cart from './src/screen/Cart';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Cart"
              options={{ headerShown: false }}
              component={Cart}
            />
            <Stack.Screen
              name="ProductList"
              // options={{ headerShown: false }}
              component={ProductList}
              options={({ navigation }) => ({
                title: 'Products',
                headerRight: () => (
                  <Icon
                    name="shopping-cart"
                    size={24}
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Cart')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Detail"
              options={{ headerShown: false }}
              component={ProductDetail}
              options={({ navigation }) => ({
                title: 'Details',
                headerRight: () => (
                  <Icon
                    name="shopping-cart"
                    size={24}
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Cart')}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}

StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
