import React, { FC, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TileList } from '../tileList';
import type { AppProps, ExampleScreenType } from './types';

const Stack = createStackNavigator();

export const Showcase: FC<AppProps> = ({
  initialScreen = 'showcase',
  data,
  ...rest
}) => {
  const screens = useMemo(
    () =>
      data.reduce<ExampleScreenType[]>((result, item) => {
        result.push(...item.data);
        return result;
      }, []),
    [data]
  );
  return (
    <>
    <Stack.Navigator initialRouteName={initialScreen}>
      <Stack.Screen
        name="showcase"
        options={{ title: '返回', headerShown: false }}
      >
        {() => <TileList data={data} {...rest} />}
      </Stack.Screen>
      {screens.map(item => (
        <Stack.Screen
          key={item.slug}
          name={item.slug}
          options={{
            title: item.name,
            headerShown: true,
            ...item.screenOptions,
          }}
          getComponent={item.getScreen}
        />
      ))}
    </Stack.Navigator>
    </>
  );
};
