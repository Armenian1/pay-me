import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import { withTheme } from "react-native-paper";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

import AddPaymentForm from "./AddPaymentForm";
import PaymentItem from "../components/PaymentItem";
import type Payment from "../models/Payment";

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
    addButtonContainer: {
      flex: 1,
      alignItems: "flex-end",
    },
    addButton: {
      flex: 1,
      color: "#28bd37",
    },
  });

function HomeScreen(props: HomeScreenProps): JSX.Element {
  const { colors } = props.theme;
  const styles = makeStyles(colors);

  const [isAddPaymentVisible, setIsAddPaymentVisible] =
    useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "payments"));

      const firestorePayments: Payment[] = [];
      querySnapshot.forEach((doc) => {
        firestorePayments.push(doc.data() as Payment);
      });

      setPayments(firestorePayments);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addPayment = async (payment: Payment) => {
    try {
      const docRef = await addDoc(collection(db, "payments"), {
        name: payment.name,
        amount: payment.amount,
        description: payment.description,
        notes: payment.notes,
        date: payment.date,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setPayments([...payments, payment]);
  };

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
        keyExtractor={(item, i) => `item.name-${i}`} // replace with ID
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.addButtonContainer}>
        <AntDesign
          name="pluscircle"
          size={30}
          color="#228f2d"
          onPress={() => setIsAddPaymentVisible(true)}
        />
      </View>
      <AddPaymentForm
        isVisible={isAddPaymentVisible}
        setIsVisible={(value: boolean) => setIsAddPaymentVisible(value)}
        addPayment={addPayment}
      />
    </View>
  );
}

export default withTheme(HomeScreen);
