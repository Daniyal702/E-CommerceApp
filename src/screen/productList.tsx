import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    try {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setFilteredProducts(data.products);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);
  const data = [
    { label: 'All', value: 'all' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Beauty', value: 'beauty' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Fragrances', value: 'fragrances' },
  ];

  const filter = (value: string) => {
    setCategory(value);
    if (value === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === value);
      setFilteredProducts(filtered);
    }
  };

  const Search = (value: string) => {
    setSearch(value);
    if (value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  const renderProduct = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('Detail', { product: item })}
      >
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          onChangeText={text => setSearch(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => Search(search)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Category"
          value={category}
          onChange={item => filter(item.value)}
        />
      </View>

      <FlatList
        style={[{ width: '100%' }]}
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  productContainer: {
    width: '40%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
    height: 150,
    padding: 5,
    margin: 10,
  },
  image: {
    width: '60%',
    height: '60%',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPrice: {
    flex: 0.5,
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListContainer: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
    height: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  dropdownContainer: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    width: '80%',
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
  },
  button: {
    width: '20%',
    height: 40,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductList;
