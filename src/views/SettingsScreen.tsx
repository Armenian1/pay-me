import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, Switch, withTheme } from "react-native-paper";

import { toggleDarkMode } from "../app/settingsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      elevation: 2,
      padding: 16,
      backgroundColor: colors.surface,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 16,
      paddingHorizontal: 16,
      width: "100%",
    },
    subheading: {
      color: colors.primary,
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
  const styles = makeStyles(colors);
  const dispatch = useAppDispatch();

  const handleDarkModeSwitch = () => {
    setIsDarkModeOn(!isDarkModeOn);
    dispatch(toggleDarkMode());
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Subheading style={styles.subheading}>Dark Mode</Subheading>
        <Switch
          value={isDarkModeOn}
          onValueChange={handleDarkModeSwitch}
        ></Switch>
      </View>
    </View>
  );
}

export default withTheme(SettingsScreen);
