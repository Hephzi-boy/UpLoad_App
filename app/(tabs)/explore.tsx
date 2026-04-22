import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MAX_PRODUCTS, removeProduct } from '@/store/productsSlice';
import { showToast } from '@/store/toastSlice';

export default function ExploreScreen() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const isComplete = products.length === MAX_PRODUCTS;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Products</Text>
      <Text style={styles.subtitle}>
        {products.length}/{MAX_PRODUCTS} uploaded
      </Text>
      {isComplete ? <Text style={styles.complete}>Upload complete.</Text> : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No uploaded products yet.</Text>
            <Text style={styles.emptyHint}>Add products in the Home tab.</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Pressable
              style={styles.removeTopRight}
              onPress={() => {
                dispatch(removeProduct(item.id));
                dispatch(showToast({ message: 'Product removed successfully.', type: 'info' }));
              }}>
              <Text style={styles.removeTopRightText}>-</Text>
            </Pressable>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.meta}>
              <Text style={styles.itemTag}>Product {index + 1}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{"\u20A6"}{item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
  complete: {
    marginTop: 8,
    color: '#166534',
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '700',
    fontSize: 12,
  },
  listContent: {
    gap: 10,
    paddingVertical: 14,
    paddingBottom: 24,
  },
  emptyCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
  },
  emptyText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyHint: {
    marginTop: 6,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  meta: {
    marginTop: 12,
  },
  itemTag: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  name: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  price: {
    marginTop: 8,
    fontSize: 20,
    color: '#0B5ED7',
    fontWeight: '800',
  },
  removeTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  removeTopRightText: {
    color: '#B91C1C',
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 22,
  },
});
