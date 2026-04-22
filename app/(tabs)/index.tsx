import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct, MAX_PRODUCTS } from '@/store/productsSlice';
import { showToast } from '@/store/toastSlice';

export default function ProductUploadScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector((state) => state.products.items);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const canAddMore = products.length < MAX_PRODUCTS;

  const pickImage = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow photo access to select a product image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  }, []);

  const addNewProduct = useCallback(() => {
    if (!canAddMore) {
      dispatch(showToast({ message: 'Product limit reached (5/5).', type: 'error' }));
      return;
    }

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName || !photoUri || !price.trim()) {
      dispatch(showToast({ message: 'Name, photo, and price are required.', type: 'error' }));
      return;
    }

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      dispatch(showToast({ message: 'Enter a valid price.', type: 'error' }));
      return;
    }

    dispatch(
      addProduct({
        id: `${Date.now()}`,
        name: trimmedName,
        price: Number(numericPrice.toFixed(2)),
        imageUri: photoUri,
      })
    );

    setName('');
    setPrice('');
    setPhotoUri('');

    if (products.length + 1 >= MAX_PRODUCTS) {
      dispatch(showToast({ message: 'You reached the product limit (5/5).', type: 'success' }));
    } else {
      dispatch(showToast({ message: 'Product uploaded successfully.', type: 'success' }));
    }
    router.push('/(tabs)/explore');
  }, [canAddMore, dispatch, name, photoUri, price, products.length, router]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.formSection}>
          <View style={styles.titleRow}>
            <Feather name="box" size={18} color="#0F172A" />
            <Text style={styles.title}>Upload</Text>
          </View>
          <Text style={styles.subtitle}>
            Add up to {MAX_PRODUCTS} products ({products.length}/{MAX_PRODUCTS} added)
          </Text>

          <Text style={styles.label}>Product Name</Text>
          <TextInput
            placeholder="Enter product name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            editable={canAddMore}
            placeholderTextColor="#6B7280"
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder={'\u20A6' + '0.00'}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            style={styles.input}
            editable={canAddMore}
            placeholderTextColor="#6B7280"
          />

          <Text style={styles.label}>Product Photo</Text>
          {!photoUri ? (
            <Pressable style={styles.uploadBox} onPress={pickImage} disabled={!canAddMore}>
              <View style={styles.uploadIconWrap}>
                <Ionicons name="arrow-up" size={12} color="#2563EB" />
              </View>
              <Text style={styles.uploadTitle}>Upload from folder</Text>
              <Text style={styles.uploadHint}>PNG, JPG (MAX 5MB)</Text>
            </Pressable>
          ) : null}

          {photoUri ? <Image source={{ uri: photoUri }} style={styles.previewImage} /> : null}
        </View>

        <View style={styles.buttonSection}>
          <Pressable
            style={[styles.addButton, !canAddMore ? styles.addButtonDisabled : null]}
            onPress={addNewProduct}>
            <Text style={styles.addButtonText}>Upload Image</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  card: {
    flex: 1,
    margin: 10,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  formSection: {
    flex: 1,
  },
  buttonSection: {
    paddingTop: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#020617',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 10,
    color: '#334155',
    fontSize: 12,
  },
  label: {
    marginTop: 6,
    marginBottom: 5,
    color: '#1F2937',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  uploadBox: {
    marginTop: 4,
    height: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2563EB',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  uploadIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    marginTop: 5,
    color: '#1E3A8A',
    fontWeight: '700',
    fontSize: 11,
  },
  uploadHint: {
    marginTop: 2,
    color: '#2563EB',
    fontSize: 9,
    fontWeight: '500',
  },
  previewImage: {
    marginTop: 10,
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  addButton: {
    marginTop: 12,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  addButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
