import React, { useState } from 'react';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import EditPaymentForm from '../views/EditPaymentForm';
import type Payment from '../models/Payment';

type PaymentItemProps = {
   theme: ReactNativePaper.Theme;
   payment: Payment;
   updatePayment: (payment: Payment) => Promise<void>;
   deletePayment: (payment: Payment) => Promise<void>;
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
         flex: 2,
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
      paymentBodyContainer: {
         flex: 6,
         paddingLeft: 10,
      },
      paymentInfoAndIconsContainer: {
         flexDirection: 'row',
      },
      paymentTitleAndDateContainer: {
         flex: 5,
      },
      paymentText: {
         fontSize: 16,
      },
      paymentTextBold: {
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
         flex: 3,
         flexDirection: 'row',
         justifyContent: 'space-around',
         alignItems: 'flex-start',
         paddingBottom: 5,
      },
      editPaymentFormContainer: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
      },
   });

const getNameInitials = (name: string) => {
   const initialsList: string[] = name.split(' ').map((x) => x[0]);
   const initials: string = initialsList[0].concat(initialsList[1] || '');

   return initials;
};

function PaymentItem(props: PaymentItemProps): JSX.Element {
   const styles = makeStyles(props.theme);
   const { name, amount, description, comments, date } = props.payment;

   const [isEditPaymentVisible, setIsEditPaymentVisible] = useState<boolean>(false);
   const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);

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
               <Text>{getNameInitials(props.payment.name)}</Text>
            </TouchableHighlight>
         </View>
         <View style={styles.paymentBodyContainer}>
            <View style={styles.paymentInfoAndIconsContainer}>
               <View style={styles.paymentTitleAndDateContainer}>
                  <View>
                     <Text style={styles.paymentText}>
                        <Text style={styles.paymentTextBold}>{name}</Text>
                        <Text> owes </Text>
                        <Text style={styles.paymentTextBold}>{`$${amount}`}</Text>
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.paymentDate}>{`${moment
                        .duration(moment().diff(date))
                        .humanize()} ago`}</Text>
                  </View>
               </View>
               <View style={styles.paymentIconsContainer}>
                  <View>
                     <Feather
                        name="edit-2"
                        size={24}
                        color={props.theme.colors.onSurface}
                        onPress={() => setIsEditPaymentVisible(true)}
                     />
                  </View>
                  <View>
                     <FontAwesome
                        name="commenting-o"
                        size={24}
                        color={props.theme.colors.onSurface}
                        onPress={() => setIsCommentsVisible(!isCommentsVisible)}
                     />
                  </View>
                  <View>
                     <FontAwesome
                        name="trash-o"
                        size={24}
                        color={props.theme.colors.onSurface}
                        onPress={() => props.deletePayment(props.payment)}
                     />
                  </View>
               </View>
            </View>
            <View>
               <View style={styles.paymentDescriptionContainer}>
                  <Text style={styles.paymentDescription}>{description}</Text>
               </View>
               {isCommentsVisible && comments !== '' && (
                  <View>
                     <Text style={styles.paymentDescription}>{comments}</Text>
                  </View>
               )}
            </View>
         </View>

         <View style={styles.editPaymentFormContainer}>
            <EditPaymentForm
               payment={props.payment}
               isVisible={isEditPaymentVisible}
               setIsVisible={(value: boolean) => setIsEditPaymentVisible(value)}
               updatePayment={props.updatePayment}
            />
         </View>
      </View>
   );
}

export default withTheme(PaymentItem);
