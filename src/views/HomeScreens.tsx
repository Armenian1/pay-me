import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebase";
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
for (let i = 0; i < 5; i++) {
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
    addButtonContainer: {
      flex: 1,
      alignItems: "flex-end",
    },
    addButton: {
      flex: 1,
      color: "#28bd37",
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

  const handleAddPayment = async () => {
    try {
      const docRef = await addDoc(collection(db, "payments"), {
        name: "Stan Fredericks",
        amount: 5,
        message: "Ice Cream",
        notes: "Said he would pay me back",
        date: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        renderItem={({ item }) => <PaymentItem payment={item} />}
        keyExtractor={(item) => item.paymentId.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.addButtonContainer}>
        <AntDesign
          name="pluscircle"
          size={30}
          color="#228f2d"
          onPress={() => handleAddPayment()}
        />
      </View>
    </View>
  );
}

export default withTheme(HomeScreen);
