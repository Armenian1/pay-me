import React from 'react';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import Payment from '../models/Payment';

type PaymentItemProps = {
   theme: ReactNativePaper.Theme;
   payment: Payment;
   deletePayment: (payment: Payment) => void;
};

const makeStyles = (theme: ReactNativePaper.Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         flexDirection: 'row',
         elevation: 2,
         margin: 5,
         backgroundColor: theme.colors.surface,
      },
      profileIconContainer: {
         flex: 1,
      },
      profileIcon: {
         width: 56,
         height: 56,
         borderWidth: 1,
         borderColor: theme.colors.onSurface,
         borderRadius: 28,
         backgroundColor: theme.colors.surface,
         justifyContent: 'center',
         alignItems: 'center',
      },
      paymentInformationContainer: {
         flex: 3,
      },
      paymentTextContainer: {
         flexDirection: 'row',
      },
      paymentText: {
         fontSize: 16,
      },
      paymentTextBold: {
         fontSize: 16,
         fontWeight: theme.fonts.medium.fontWeight,
      },
      paymentDate: {
         fontStyle: 'italic',
      },
      paymentDescriptionContainer: {
         marginTop: 15,
      },
      paymentDescription: {
         fontSize: 18,
      },
      paymentIconsContainer: {
         flex: 1,
         justifyContent: 'center',
      },
   });

function PaymentItem(props: PaymentItemProps): JSX.Element {
   const styles = makeStyles(props.theme);
   const { name, amount, description, date } = props.payment;
   return (
      <View style={styles.container}>
         <View style={styles.profileIconContainer}>
            <TouchableHighlight
               style={styles.profileIcon}
               underlayColor="#ccc"
               onPress={() => {
                  console.log('Opening up contact page.');
               }}
            >
               <Text>AA</Text>
            </TouchableHighlight>
         </View>
         <View style={styles.paymentInformationContainer}>
            <View style={styles.paymentTextContainer}>
               <Text style={styles.paymentTextBold}>{name}</Text>
               <Text style={styles.paymentText}> owes </Text>
               <Text style={styles.paymentTextBold}>{`$${amount}`}</Text>
            </View>
            <View>
               <Text style={styles.paymentDate}>{`${moment
                  .duration(moment().diff(date))
                  .humanize()} ago`}</Text>
            </View>
            <View style={styles.paymentDescriptionContainer}>
               <Text style={styles.paymentDescription}>{description}</Text>
            </View>
         </View>
         <View style={styles.paymentIconsContainer}>
            <FontAwesome
               name="trash-o"
               size={24}
               color={props.theme.colors.onSurface}
               onPress={() => props.deletePayment(props.payment)}
            />
         </View>
      </View>
   );
}

export default withTheme(PaymentItem);
