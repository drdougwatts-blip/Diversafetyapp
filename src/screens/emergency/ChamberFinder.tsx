import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmergencyStackParamList } from './EmergencyStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { API_ENDPOINTS } from '../../constants/api';
import { findNearestChambers } from '../../data/chambers';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { StatusBadge } from '../../components/StatusBadge';
import { CallButton } from '../../components/CallButton';
import { Chamber } from '../../types';

type Props = NativeStackScreenProps<EmergencyStackParamList, 'ChamberFinder'>;

export function ChamberFinder({ route }: Props) {
  const initialPostcode = route.params?.postcode ?? '';
  const [postcode, setPostcode] = useState(initialPostcode);
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [criticalCareOnly, setCriticalCareOnly] = useState(false);
  const isConnected = useNetworkStatus();

  const searchByPostcode = async (pc: string) => {
    if (!pc.trim()) {
      Alert.alert('Enter a Postcode', 'Please enter a UK postcode to find your nearest chamber.');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      if (!isConnected) throw new Error('offline');
      // Try the remote API first, but cap the wait so a slow response
      // never delays emergency results — local data is the fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const url = `${API_ENDPOINTS.chamberFinder}?postcode=${encodeURIComponent(pc.trim())}&criticalCare=${criticalCareOnly}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setChambers(data.chambers || []);
    } catch {
      // Fall back to built-in chamber data
      const localResult = findNearestChambers(pc.trim(), criticalCareOnly);
      if (localResult && localResult.chambers.length > 0) {
        setChambers(localResult.chambers);
      } else {
        Alert.alert(
          'Search Failed',
          'Unable to find chambers. In an emergency, call 999 and ask for Coastguard, or call the BHA helpline on 07831 151 523.'
        );
        setChambers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocodeWeb = async (lat: number, lon: number): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
        { headers: { 'User-Agent': 'DiversafetyApp/1.0' } }
      );
      const data = await res.json();
      return data?.address?.postcode ?? null;
    } catch {
      return null;
    }
  };

  const useMyLocation = async () => {
    if (!isConnected) {
      Alert.alert(
        'Offline',
        'Location lookup needs an internet connection. Please enter your postcode manually.'
      );
      return;
    }
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        // Use browser Geolocation API on web
        if (!navigator.geolocation) {
          Alert.alert('Location Error', 'Geolocation is not supported by your browser.');
          setLoading(false);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const pc = await reverseGeocodeWeb(position.coords.latitude, position.coords.longitude);
            if (pc) {
              setPostcode(pc);
              await searchByPostcode(pc);
            } else {
              Alert.alert('Location Error', 'Unable to determine your postcode. Please enter it manually.');
              setLoading(false);
            }
          },
          () => {
            Alert.alert('Location Permission', 'Please enable location access to use this feature, or enter a postcode manually.');
            setLoading(false);
          }
        );
        return;
      }

      // Native: use expo-location
      const Location = await import('expo-location');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Please enable location access in settings to use this feature, or enter a postcode manually.'
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const pc = reverseGeocode[0]?.postalCode;
      if (pc) {
        setPostcode(pc);
        await searchByPostcode(pc);
      } else {
        Alert.alert('Location Error', 'Unable to determine your postcode. Please enter it manually.');
        setLoading(false);
      }
    } catch {
      Alert.alert('Location Error', 'Unable to get your location. Please enter a postcode manually.');
      setLoading(false);
    }
  };

  const openDirections = (chamber: Chamber) => {
    const query = encodeURIComponent(chamber.name + ' ' + chamber.location);
    const url = Platform.select({
      ios: `maps:?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://maps.google.com/?q=${query}`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Offline notice — postcode search still works from built-in data */}
        {!isConnected && (
          <View style={styles.offlineNotice}>
            <Ionicons name="cloud-offline" size={20} color={Colors.amber} />
            <Text style={styles.offlineNoticeText}>
              You're offline. Postcode search still works using built-in
              chamber data, but "Use my location" is unavailable.
            </Text>
          </View>
        )}

        {/* Search input */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter UK postcode (e.g. PL6 8BU)"
            placeholderTextColor={Colors.midGrey}
            value={postcode}
            onChangeText={setPostcode}
            autoCapitalize="characters"
            returnKeyType="search"
            onSubmitEditing={() => searchByPostcode(postcode)}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => searchByPostcode(postcode)}
          >
            <Ionicons name="search" size={20} color={Colors.white} />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationButton} onPress={useMyLocation}>
          <Ionicons name="navigate" size={20} color={Colors.teal} />
          <Text style={styles.locationButtonText}>Use my location</Text>
        </TouchableOpacity>

        {/* Critical care filter */}
        <TouchableOpacity
          style={styles.filterRow}
          onPress={() => setCriticalCareOnly(!criticalCareOnly)}
        >
          <Ionicons
            name={criticalCareOnly ? 'checkbox' : 'square-outline'}
            size={22}
            color={Colors.teal}
          />
          <Text style={styles.filterText}>Only show chambers with critical care</Text>
        </TouchableOpacity>

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.emergencyRed} />
            <Text style={styles.loadingText}>Finding nearest chambers...</Text>
          </View>
        )}

        {/* Results */}
        {!loading && searched && chambers.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No chambers found. In an emergency, call the BHA helpline on 07831 151 523.
            </Text>
          </View>
        )}

        {!loading &&
          chambers.map((chamber, index) => {
            const isNotOperational = chamber.status === 'Not operational';
            return (
              <View
                key={index}
                style={[
                  styles.chamberCard,
                  isNotOperational && styles.chamberCardDisabled,
                ]}
              >
                <View style={styles.chamberHeader}>
                  <Text
                    style={[
                      styles.chamberRank,
                      isNotOperational && styles.textDisabled,
                    ]}
                  >
                    #{index + 1}
                  </Text>
                  <StatusBadge status={chamber.status} />
                </View>
                <Text
                  style={[
                    styles.chamberName,
                    isNotOperational && styles.textDisabled,
                  ]}
                >
                  {chamber.name}
                </Text>
                <Text style={styles.chamberLocation}>{chamber.location}</Text>
                <View style={styles.chamberMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="car" size={16} color={Colors.midGrey} />
                    <Text style={styles.metaText}>
                      {chamber.drivingTimeMinutes} min drive
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="map" size={16} color={Colors.midGrey} />
                    <Text style={styles.metaText}>
                      {chamber.distanceMiles} miles
                    </Text>
                  </View>
                </View>
                {!isNotOperational && (
                  <View style={styles.chamberActions}>
                    {chamber.phone && (
                      <CallButton
                        label="Call this chamber"
                        phoneNumber={chamber.phone}
                        color={Colors.emergencyRed}
                        variant="secondary"
                      />
                    )}
                    <TouchableOpacity
                      style={styles.directionsButton}
                      onPress={() => openDirections(chamber)}
                    >
                      <Ionicons name="navigate" size={18} color={Colors.teal} />
                      <Text style={styles.directionsText}>Get directions</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  searchSection: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.darkText,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    minHeight: MinTapTarget,
  },
  searchButton: {
    backgroundColor: Colors.emergencyRed,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: MinTapTarget,
  },
  searchButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  locationButtonText: {
    color: Colors.teal,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterText: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.sm,
    color: Colors.midGrey,
    fontSize: FontSizes.md,
  },
  noResults: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  noResultsText: {
    color: Colors.midGrey,
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  chamberCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chamberCardDisabled: {
    opacity: 0.5,
  },
  chamberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  chamberRank: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.emergencyRed,
  },
  chamberName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: 2,
  },
  chamberLocation: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginBottom: Spacing.sm,
  },
  chamberMeta: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
  },
  chamberActions: {
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.teal,
    borderRadius: BorderRadius.md,
    minHeight: MinTapTarget,
  },
  directionsText: {
    color: Colors.teal,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
  textDisabled: {
    color: Colors.disabledGrey,
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: '#FFF3E0',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.amber,
  },
  offlineNoticeText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
});
