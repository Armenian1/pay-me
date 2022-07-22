import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, Text } from 'react-native-paper';
import RNModal from 'react-native-modal';

const makeStyles = (theme: ReactNativePaper.Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: theme.colors.surface,
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

type ModalProps = {
   theme: ReactNativePaper.Theme;
   isVisible: boolean;
   children: React.ReactNode;
   onBackdropPress: () => void;
};

const Modal = ({ theme, isVisible = false, children, onBackdropPress, ...props }: ModalProps) => {
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

const ModalContainer = ({
   theme,
   children,
}: {
   theme: ReactNativePaper.Theme;
   children: React.ReactNode;
}) => <View style={makeStyles(theme).container}>{children}</View>;

const ModalHeader = ({ theme, title }: { theme: ReactNativePaper.Theme; title: string }) => {
   const styles = makeStyles(theme);
   return (
      <View style={styles.header}>
         <Text style={styles.text}>{title}</Text>
      </View>
   );
};

const ModalBody = ({
   theme,
   children,
}: {
   theme: ReactNativePaper.Theme;
   children?: React.ReactNode;
}) => <View style={makeStyles(theme).body}>{children}</View>;

const ModalFooter = ({
   theme,
   children,
}: {
   theme: ReactNativePaper.Theme;
   children?: React.ReactNode;
}) => <View style={makeStyles(theme).footer}>{children}</View>;

Modal.Header = withTheme(ModalHeader);
Modal.Container = withTheme(ModalContainer);
Modal.Body = withTheme(ModalBody);
Modal.Footer = withTheme(ModalFooter);

export default withTheme(Modal);
