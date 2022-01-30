import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, Switch, withTheme } from "react-native-paper";

import { toggleDarkMode } from "../app/settingsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 16,
    width: "100%",
  },
});

type SettingsScreenProps = {
  theme: ReactNativePaper.Theme;
};

function SettingsScreen(props: SettingsScreenProps) {
  const [isDarkModeOn, setIsDarkModeOn] = useState(
    useAppSelector((state) => state.settings.isDarkModeOn)
  );

  const { colors } = props.theme;
  const dispatch = useAppDispatch();

  const handleDarkModeSwitch = () => {
    setIsDarkModeOn(!isDarkModeOn);
    dispatch(toggleDarkMode());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <Subheading style={{ color: colors.primary }}>Dark Mode</Subheading>
        <Switch
          value={isDarkModeOn}
          onValueChange={handleDarkModeSwitch}
        ></Switch>
      </View>
    </View>
  );
}

export default withTheme(SettingsScreen);
