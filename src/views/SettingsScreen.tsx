import { StyleSheet, View } from "react-native";
import { Subheading, Switch, withTheme } from "react-native-paper";

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
  const { colors } = props.theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <Subheading style={{ color: colors.primary }}>Dark Mode</Subheading>
        <Switch value={true}></Switch>
      </View>
    </View>
  );
}

export default withTheme(SettingsScreen);
