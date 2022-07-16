import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';

import Modal from '../components/Modal';
import Payment from '../models/Payment';

type AddPaymentFormProps = {
   theme: ReactNativePaper.Theme;
   isVisible: boolean;
   setIsVisible: (value: boolean) => void;
   addPayment: (payment: Partial<Payment>) => Promise<void>;
};

const makeStyles = (theme: ReactNativePaper.Theme) =>
   StyleSheet.create({
      inputFieldContainer: {
         margin: 5,
      },
      optionalInputFieldLabelContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
      },
      inputField: {
         backgroundColor: '#FFFFFF',
      },
      addPaymentButton: {
         padding: 3,
         borderRadius: 5,
      },
      addPaymentButtonText: {
         fontSize: 18,
      },
   });

function AddPaymentForm(props: AddPaymentFormProps): JSX.Element {
   const styles = makeStyles(props.theme);

   const [name, setName] = useState<string>('');
   const [amount, setAmount] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [notes, setNotes] = useState<string>('');
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

   const isModalVisible: boolean = props.isVisible;

   const resetForm = () => {
      setName('');
      setAmount('');
      setDescription('');
      setNotes('');
      setIsButtonDisabled(false);
   };

   const handleAddPaymentClick = () => {
      setIsButtonDisabled(true);
      const newPayment: Partial<Payment> = {
         name: name,
         amount: Number(amount),
         description: description,
         notes: notes,
         date: new Date().toLocaleDateString(),
      };

      props.addPayment(newPayment);
      props.setIsVisible(false);

      resetForm();
   };

   return (
      <Modal isVisible={isModalVisible} onBackdropPress={() => props.setIsVisible(false)}>
         <Modal.Container>
            <Modal.Header title="Add a new payment." />
            <Modal.Body>
               <View style={styles.inputFieldContainer}>
                  <Text>Name</Text>
                  <TextInput
                     mode="outlined"
                     style={styles.inputField}
                     dense
                     value={name}
                     onChangeText={(text) => setName(text)}
                  />
               </View>
               <View style={styles.inputFieldContainer}>
                  <Text>Amount</Text>
                  <TextInput
                     mode="outlined"
                     style={styles.inputField}
                     dense
                     value={amount}
                     onChangeText={(text) => setAmount(text)}
                     keyboardType="numeric"
                  />
               </View>
               <View style={styles.inputFieldContainer}>
                  <Text>Description</Text>
                  <TextInput
                     mode="outlined"
                     style={styles.inputField}
                     dense
                     value={description}
                     onChangeText={(text) => setDescription(text)}
                  />
               </View>
               <View style={styles.inputFieldContainer}>
                  <View style={styles.optionalInputFieldLabelContainer}>
                     <Text>Notes</Text>
                     <Text>(Optional)</Text>
                  </View>
                  <View>
                     <TextInput
                        mode="outlined"
                        style={styles.inputField}
                        dense
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                     />
                  </View>
               </View>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  mode="contained"
                  style={styles.addPaymentButton}
                  labelStyle={styles.addPaymentButtonText}
                  color="green"
                  disabled={isButtonDisabled}
                  onPress={() => handleAddPaymentClick()}
                  uppercase={false}
                  accessibilityLabel="Add a Payment"
               >
                  Add Payment
               </Button>
            </Modal.Footer>
         </Modal.Container>
      </Modal>
   );
}

export default withTheme(AddPaymentForm);
