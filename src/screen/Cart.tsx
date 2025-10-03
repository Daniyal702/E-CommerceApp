import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../functions/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Cart() {
  const { cart, getTotalPrice, addToCart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>
              {item.title} x {item.quantity} = ${item.price * item.quantity}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Icon name="add" size={22} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    width: '80%',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    right: 20,
  },
});
