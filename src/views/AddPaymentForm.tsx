import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { withTheme, TextInput } from "react-native-paper";

import Modal from "../components/Modal";
import Payment from "../models/Payment";

type AddPaymentFormProps = {
  theme: ReactNativePaper.Theme;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  addPayment: (payment: Payment) => Promise<void>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function AddPaymentForm(props: AddPaymentFormProps): JSX.Element {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const isModalVisible: boolean = props.isVisible;

  const handleAddPaymentClick = () => {
    const newPayment: Payment = {
      // For some reason ID is not being saved.
      //paymentId: 34, // Need to make this ID unique.
      name: name,
      amount: Number(amount),
      description: description,
      notes: notes,
      date: new Date().toLocaleDateString(),
    };

    props.addPayment(newPayment);
    props.setIsVisible(false);

    // Perhaps it will be better to destroy the component rather than resetting its values here.
    setName("");
    setAmount("");
    setDescription("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => props.setIsVisible(false)}
      >
        <Modal.Container>
          <Modal.Header title="Add a new payment." />
          <Modal.Body>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              label="Notes"
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Add Payment"
              onPress={() => handleAddPaymentClick()}
            />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
}

export default withTheme(AddPaymentForm);
