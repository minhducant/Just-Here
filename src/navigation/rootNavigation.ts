import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef<any>();

export const navigation = navigationRef.current;

export function goBack() {
  navigationRef.current.goBack();
}

export function replace(name: any, params = {}) {
  navigationRef.current.dispatch(StackActions.replace(name, params));
}
export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop());
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export function navigate(name: string, params = {}) {
  navigationRef.current.navigate(name, params);
}

export function push(name: string, params = {}) {
  navigationRef.current.push(name, params);
}

export function reset(name: string, params = {}) {
  navigationRef.current.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

export function pop(count = 1) {
  navigationRef.current.pop(count);
}

export function canGoBack() {
  return navigationRef.current?.canGoBack();
}
