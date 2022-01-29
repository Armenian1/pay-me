import React from "react";
import { ScrollView } from "react-native";

import PaymentItem from "../components/PaymentItem";
import type Payment from "../models/Payment";

const newPayment: Payment = {
  date: "1/22/2021",
  name: "armen",
  description: "food",
  amount: 15,
};

const payments: Payment[] = [newPayment, newPayment, newPayment, newPayment];

export default function HomeScreen() {
  return (
    <ScrollView>
      {payments.map((payment, i) => (
        <PaymentItem key={`${payment.name}-${i}`} payment={payment} />
      ))}
    </ScrollView>
  );
}
