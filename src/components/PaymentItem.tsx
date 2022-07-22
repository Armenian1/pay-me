import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { withTheme, Subheading } from 'react-native-paper';

import Payment from '../models/Payment';

type PaymentItemProps = {
   theme: ReactNativePaper.Theme;
   payment: Payment;
   deletePayment: (payment: Payment) => void;
};

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
   StyleSheet.create({
      container: {
         flex: 1,
         flexDirection: 'row',
         elevation: 2,
         margin: 5,
         backgroundColor: colors.surface,
      },
      paymentTextContainer: {
         flex: 3,
      },
      paymentIconsContainer: {
         flex: 1,
      },
   });

function PaymentItem(props: PaymentItemProps): JSX.Element {
   const { colors } = props.theme;

   const { name, amount, description, date } = props.payment;
   const styles = makeStyles(colors);
   return (
      <View style={styles.container}>
         <View style={styles.paymentTextContainer}>
            <Subheading>{`${name} owes $${amount}`}</Subheading>
         </View>
         <View style={styles.paymentIconsContainer}>
            <FontAwesome
               name="trash-o"
               size={24}
               color="black"
               onPress={() => props.deletePayment(props.payment)}
            />
         </View>
      </View>
   );
}

export default withTheme(PaymentItem);
