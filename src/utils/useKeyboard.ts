import { useLayoutEffect, useRef, useState } from 'react';
import { EmitterSubscription, Keyboard, Platform } from 'react-native';

const useKeyboard = () => {
  const keyboardShowListener = useRef<EmitterSubscription>();
  const keyboardHideListener = useRef<EmitterSubscription>();
  const [isOpen, setIsOpen] = useState(false);
  const os = Platform.OS;

  useLayoutEffect(() => {
    if (os === 'android') {
      keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
        setIsOpen(true),
      );
      keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
        setIsOpen(false),
      );
    }
    if (os === 'ios') {
      keyboardShowListener.current = Keyboard.addListener('keyboardWillShow', () =>
        setIsOpen(true),
      );
      keyboardHideListener.current = Keyboard.addListener('keyboardWillHide', () =>
        setIsOpen(false),
      );
    }

    return () => {
      keyboardShowListener.current?.remove();
      keyboardHideListener.current?.remove();
    };
  }, [isOpen]);

  return {
    isOpen,
    dismiss: () => Keyboard.dismiss(),
  };
};

export default useKeyboard;
