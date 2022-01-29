import { StyleSheet, Text, View } from "react-native";
import Payment from "../models/Payment";

type PaymentItemProps = {
  payment: Payment;
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
  },
});

export default function PaymentItem(props: PaymentItemProps) {
  const { name, amount, description, date } = props.payment;
  return (
    <View style={styles.container}>
      <Text>{`${name} - $${amount}`}</Text>
      <Text>{`${description} - ${date}`}</Text>
    </View>
  );
}
