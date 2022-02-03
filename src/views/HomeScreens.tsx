import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { withTheme } from "react-native-paper";

import PaymentItem from "../components/PaymentItem";
import type Payment from "../models/Payment";

const p1: Payment = {
  paymentId: 1,
  date: "1/22/2021",
  name: "armen",
  description: "food",
  amount: 15,
};

const payments: Payment[] = [];
for (let i = 0; i < 10; i++) {
  payments.push({ ...p1, paymentId: i });
}

type HomeScreenProps = {
  theme: ReactNativePaper.Theme;
};

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      elevation: 2,
      padding: 16,
      backgroundColor: colors.surface,
    },
  });

function HomeScreen(props: HomeScreenProps) {
  const { colors } = props.theme;
  const styles = makeStyles(colors);

  const renderSeparator = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: colors.accent,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        renderItem={({ item }) => <PaymentItem payment={item} />}
        keyExtractor={(item) => item.paymentId.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

export default withTheme(HomeScreen);
