import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../functions/CartContext';

export default function ProductDetail({ route }) {
  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 150,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
