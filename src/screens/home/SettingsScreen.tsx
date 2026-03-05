import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { logOut, useAccount } from '@/utils';

const SettingsScreen = () => {
  const { user } = useAccount();
  console.log('User in SettingsScreen: ', user);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Text>User: {user?.name}</Text>
      <TouchableOpacity
        onPress={logOut}
        style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
