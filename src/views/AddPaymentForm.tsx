import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import Modal from '../components/Modal';
import Payment from '../models/Payment';

type AddPaymentFormProps = {
   theme: ReactNativePaper.Theme;
   isVisible: boolean;
   setIsVisible: (value: boolean) => void;
   addPayment: (payment: Partial<Payment>) => Promise<void>;
};

type FormData = {
   name: string;
   amount: string;
   description: string;
   notes: string;
};

const currencyRegExp: RegExp =
   /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;

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
      errorText: {
         color: 'red',
      },
   });

function AddPaymentForm(props: AddPaymentFormProps): JSX.Element {
   const styles = makeStyles(props.theme);
   const isModalVisible: boolean = props.isVisible;

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isValid },
   } = useForm<FormData>({
      defaultValues: {
         name: '',
         amount: '',
         description: '',
         notes: '',
      },
      mode: 'onChange',
   });

   const addPayment = (data: FormData) => {
      const newPayment: Partial<Payment> = {
         name: data.name,
         amount: Number(data.amount),
         description: data.description,
         notes: data.notes,
         date: new Date().toLocaleDateString(),
      };

      props.addPayment(newPayment);
      props.setIsVisible(false);

      reset(undefined, { keepDefaultValues: true });
   };

   return (
      <Modal isVisible={isModalVisible} onBackdropPress={() => props.setIsVisible(false)}>
         <Modal.Container>
            <Modal.Header title="Add a New Payment" />
            <Modal.Body>
               <View style={styles.inputFieldContainer}>
                  <Text>Name</Text>
                  <Controller
                     control={control}
                     rules={{ required: true }}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                           mode="outlined"
                           style={styles.inputField}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           dense
                        />
                     )}
                     name="name"
                  />
                  {errors.name && <Text style={styles.errorText}>This is required.</Text>}
               </View>
               <View style={styles.inputFieldContainer}>
                  <Text>Amount</Text>
                  <Controller
                     control={control}
                     rules={{
                        required: true,
                        pattern: currencyRegExp,
                     }}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                           mode="outlined"
                           style={styles.inputField}
                           onBlur={onBlur}
                           onChangeText={(text) => onChange(text.slice(1).trim())}
                           value={`$ ${value}`}
                           keyboardType="numeric"
                           dense
                        />
                     )}
                     name="amount"
                  />
                  {errors.amount && errors.amount.type === 'required' && (
                     <Text style={styles.errorText}>This is required.</Text>
                  )}
                  {errors.amount && errors.amount.type === 'pattern' && (
                     <Text style={styles.errorText}>Must be a valid dollar amount.</Text>
                  )}
               </View>
               <View style={styles.inputFieldContainer}>
                  <Text>Description</Text>
                  <Controller
                     control={control}
                     rules={{ required: true }}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                           mode="outlined"
                           style={styles.inputField}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           dense
                        />
                     )}
                     name="description"
                  />
                  {errors.description && <Text style={styles.errorText}>This is required.</Text>}
               </View>
               <View style={styles.inputFieldContainer}>
                  <View style={styles.optionalInputFieldLabelContainer}>
                     <Text>Notes</Text>
                     <Text>(Optional)</Text>
                  </View>
                  <Controller
                     control={control}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                           mode="outlined"
                           style={styles.inputField}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           dense
                        />
                     )}
                     name="notes"
                  />
               </View>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  mode="contained"
                  style={styles.addPaymentButton}
                  labelStyle={styles.addPaymentButtonText}
                  color="green"
                  disabled={!isValid}
                  onPress={handleSubmit(addPayment)}
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
