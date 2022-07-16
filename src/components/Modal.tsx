import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNModal from 'react-native-modal';

type ModalProps = {
   isVisible: boolean;
   children: React.ReactNode;
   onBackdropPress: () => void;
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#f5f5f5',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
   },
   header: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      paddingTop: 10,
      textAlign: 'center',
      fontSize: 24,
   },
   body: {
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingVertical: 15,
      minHeight: 100,
   },
   footer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      flexDirection: 'row',
   },
});

const Modal = ({ isVisible = false, children, onBackdropPress, ...props }: ModalProps) => {
   return (
      <RNModal
         isVisible={isVisible}
         animationInTiming={1000}
         animationOutTiming={1000}
         backdropTransitionInTiming={800}
         backdropTransitionOutTiming={800}
         onBackdropPress={onBackdropPress}
         avoidKeyboard
         {...props}
      >
         {children}
      </RNModal>
   );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
   <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
   <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
   </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
   <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
   <View style={styles.footer}>{children}</View>
);

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
