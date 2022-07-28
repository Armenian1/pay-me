import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

import AddPaymentForm from './AddPaymentForm';
import PaymentItem from '../components/PaymentItem';
import { db } from '../database/firebase';
import type Payment from '../models/Payment';
import type { DocumentData, DocumentReference, QuerySnapshot } from 'firebase/firestore';

type HomeScreenProps = {
   theme: ReactNativePaper.Theme;
};

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
   StyleSheet.create({
      container: {
         flex: 1,
         elevation: 2,
         paddingTop: 5,
         paddingLeft: 5,
         backgroundColor: colors.surface,
      },
      addButtonContainer: {
         position: 'absolute',
         bottom: 10,
         right: 10,
      },
      addButton: {
         flex: 1,
         color: '#28bd37',
      },
      addPaymentFormContainer: {
         position: 'absolute',
      },
   });

function HomeScreen(props: HomeScreenProps): JSX.Element {
   const { colors } = props.theme;
   const styles = makeStyles(colors);

   const [payments, setPayments] = useState<Payment[]>([]);
   const [isAddPaymentVisible, setIsAddPaymentVisible] = useState<boolean>(false);
   const [isRefreshing, setIsRefreshing] = useState<boolean>(true);

   useEffect(() => {
      getPayments();
   }, []);

   const getPayments = async () => {
      try {
         const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
            collection(db, 'payments')
         );

         const payments: Payment[] = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id } as Payment))
            .sort((a, b) => (a.date < b.date ? 1 : -1));

         setPayments(payments);
      } catch (e) {
         console.error('Error adding document: ', e);
      } finally {
         setIsRefreshing(false);
      }
   };

   const addPayment = async (payment: Partial<Payment>) => {
      setIsRefreshing(true);
      try {
         const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, 'payments'), {
            name: payment.name,
            amount: payment.amount,
            description: payment.description,
            comments: payment.comments,
            date: payment.date,
         });
         console.log('Document written with ID: ', docRef.id);

         await getPayments();
      } catch (e) {
         console.error('Error adding document: ', e);
      } finally {
         setIsRefreshing(false);
      }
   };

   const updatePayment = async (payment: Payment) => {
      setIsRefreshing(true);
      const { id, ...paymentData } = payment;
      try {
         const docRef: DocumentReference<DocumentData> = doc(db, 'payments', id);
         await setDoc(docRef, paymentData);
         console.log(`Document with ID ${docRef.id} successfully updated`);

         await getPayments();
      } catch (e) {
         console.error('Error updating document: ', e);
      } finally {
         setIsRefreshing(false);
      }
   };

   const deletePayment = async (payment: Payment) => {
      setIsRefreshing(true);
      try {
         await deleteDoc(doc(db, 'payments', payment.id));
         console.log(`Payment ${payment.name} has successfully been deleted`);

         await getPayments();
      } catch (e) {
         console.error('Error deleting document: ', e);
      } finally {
         setIsRefreshing(false);
      }
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

   return !isRefreshing ? (
      <View style={styles.container}>
         <View>
            <FlatList
               data={payments}
               renderItem={({ item }) => (
                  <PaymentItem
                     payment={item}
                     updatePayment={updatePayment}
                     deletePayment={deletePayment}
                  />
               )}
               keyExtractor={(item) => item.id}
               ItemSeparatorComponent={renderSeparator}
               refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={getPayments} />}
            />
         </View>
         <View style={styles.addButtonContainer}>
            <AntDesign
               name="pluscircle"
               size={30}
               color="#228f2d"
               onPress={() => setIsAddPaymentVisible(true)}
            />
         </View>
         <View style={styles.addPaymentFormContainer}>
            <AddPaymentForm
               isVisible={isAddPaymentVisible}
               setIsVisible={(value: boolean) => setIsAddPaymentVisible(value)}
               addPayment={addPayment}
            />
         </View>
      </View>
   ) : (
      <View style={styles.container}>
         <ActivityIndicator size={'large'} />
      </View>
   );
}

export default withTheme(HomeScreen);
