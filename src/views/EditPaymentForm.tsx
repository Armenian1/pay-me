import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import Modal from '../components/Modal';
import Payment from '../models/Payment';

type EditPaymentFormProps = {
   theme: ReactNativePaper.Theme;
   payment: Payment;
   isVisible: boolean;
   setIsVisible: (value: boolean) => void;
   updatePayment: (payment: Payment) => Promise<void>;
};

type FormData = {
   name: string;
   amount: string;
   description: string;
   comments: string;
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
      updatePaymentButton: {
         padding: 3,
         borderRadius: 5,
      },
      updatePaymentButtonText: {
         fontSize: 18,
      },
      errorText: {
         color: 'red',
      },
   });

function EditPaymentForm(props: EditPaymentFormProps): JSX.Element {
   const styles = makeStyles(props.theme);
   const isModalVisible: boolean = props.isVisible;

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isValid },
   } = useForm<FormData>({
      defaultValues: {
         name: props.payment.name,
         amount: props.payment.amount.toString(),
         description: props.payment.description,
         comments: props.payment.comments,
      },
      mode: 'onChange',
   });

   const updatePayment = (data: FormData) => {
      const updatedPayment: Payment = {
         ...props.payment,
         name: data.name.trim(),
         amount: Number(data.amount),
         description: data.description.trim(),
         comments: data.comments.trim(),
      };

      props.updatePayment(updatedPayment);
      props.setIsVisible(false);

      reset(undefined, { keepDefaultValues: true });
   };

   return (
      <Modal isVisible={isModalVisible} onBackdropPress={() => props.setIsVisible(false)}>
         <Modal.Container>
            <Modal.Header title="Edit Payment" />
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
                     <Text>Comments</Text>
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
                     name="comments"
                  />
               </View>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  mode="contained"
                  style={styles.updatePaymentButton}
                  labelStyle={styles.updatePaymentButtonText}
                  color="green"
                  disabled={!isValid}
                  onPress={handleSubmit(updatePayment)}
                  uppercase={false}
                  accessibilityLabel="Update Payment"
               >
                  Update Payment
               </Button>
            </Modal.Footer>
         </Modal.Container>
      </Modal>
   );
}

export default withTheme(EditPaymentForm);
