import React, { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  PanResponder,
  useColorScheme,
  TouchableOpacity,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';
import Animated, {
  withDelay,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  runOnJS, 
} from 'react-native-reanimated';
import normalize from 'react-native-normalize';

import { getTheme } from '@/constants/theme';
import { IconClose, HelpToast, FailToast, SuccessToast, WarningToast } from '@/assets/icons';

const TOAST_DURATION = 2000;

const ToastMessage = () => {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showingState, setShowingState] = useState(false);
  const toastBottomAnimation = useSharedValue(-100);
  const [toastOptions, setToastOptions] = useState<any>({});
  const BOTTOM_VALUE = Platform.OS === 'ios' ? normalize(60) : normalize(20);

  const showToastMessage = useCallback(
    (options: any) => {
      setToastOptions(options);
      setShowingState(true);
      toastBottomAnimation.value = withSequence(
        withTiming(BOTTOM_VALUE),
        withDelay(
          TOAST_DURATION,
          withTiming(normalize(-150), undefined, finished => {
            if (finished) {
              runOnJS(setShowingState)(false);
            }
          }),
        ),
      );
    },
    [BOTTOM_VALUE, toastBottomAnimation],
  );

  useLayoutEffect(() => {
    const toastListener = DeviceEventEmitter.addListener('SHOW_TOAST_MESSAGE', showToastMessage);
    return () => {
      toastListener.remove();
    };
  });

  useLayoutEffect(() => {
    const toastListener = DeviceEventEmitter.addListener('HIDE_TOAST_MESSAGE', hideToast);
    return () => {
      toastListener.remove();
    };
  });

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      bottom: toastBottomAnimation.value,
    };
  });

  const hideToast = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      toastBottomAnimation.value = withTiming(normalize(-150), undefined, finished => {
        if (finished) {
          runOnJS(setShowingState)(false);
        }
      });
    });
  }, [toastBottomAnimation]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        hideToast();
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <Animated.View {...panResponder.panHandlers} style={[styles.toastContainer, animatedTopStyles]}>
      {showingState && (
        <>
          {toastOptions.type === 'success' ? (
            <SuccessToast />
          ) : toastOptions.type === 'fail' ? (
            <FailToast />
          ) : toastOptions.type === 'warning' ? (
            <WarningToast />
          ) : (
            <HelpToast />
          )}
          <View style={styles.toastMessageContainer}>
            <Text style={styles.toastTitle}>
              {toastOptions.type === 'success'
                ? 'Well done!'
                : toastOptions.type === 'fail'
                  ? 'Oh snap!'
                  : toastOptions.type === 'warning'
                    ? 'Warning!'
                    : 'Hi there!'}
            </Text>
            <Text style={styles.toastMessage} numberOfLines={2}>
              {toastOptions.message}
            </Text>
          </View>
          <TouchableOpacity onPress={hideToast} activeOpacity={0.7} style={styles.closeIcon}>
            <IconClose />
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

export default ToastMessage;

const createStyles = (theme: any) =>
  StyleSheet.create({
    toastContainer: {
      position: 'absolute',
      bottom: 0,
      width: '90%',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'transparent',
    },
    toastMessageContainer: {
      position: 'absolute',
      top: normalize(30),
      width: normalize(270),
      height: normalize(100),
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: normalize(40),
      left: normalize(45),
    },
    toastMessage: {
      fontFamily: theme.typography.fontFamily.BOLD,
      fontSize: 14,
      color: theme.colors.textPrimary,
      paddingTop: normalize(5),
    },
    toastTitle: {
      fontFamily: theme.typography.fontFamily.BOLD,
      fontSize: 20,
      color: theme.colors.textPrimary,
    },
    closeIcon: {
      position: 'absolute',
      top: normalize(35),
      right: normalize(5),
      zIndex: 3,
      width: normalize(50),
      height: normalize(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
