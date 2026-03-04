import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { actions } from '@/stores/action';

export default function OnboardingScreen() {
  const dispatch = useDispatch();

  const handleSkip = () => {
    dispatch(actions.app.setHasCompletedOnboarding(true));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  skipBtn: {
    position: 'absolute',
    right: 50,
    bottom: 100,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
});
