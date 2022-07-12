import React from "react";
import { StyleSheet, View } from "react-native";
import Payment from "../models/Payment";
import { withTheme, Subheading } from "react-native-paper";

type PaymentItemProps = {
  theme: ReactNativePaper.Theme;
  payment: Payment;
};

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      elevation: 2,
      margin: 5,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
  });

function PaymentItem(props: PaymentItemProps): JSX.Element {
  const { colors } = props.theme;
  const { name, amount, description, date } = props.payment;
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <Subheading>{`${name} owes $${amount}`}</Subheading>
    </View>
  );
}

export default withTheme(PaymentItem);
