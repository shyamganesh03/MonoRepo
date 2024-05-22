import { View, Text } from 'react-native';
import React from 'react';
import { Icon } from '@libs/native-icons';
import { useTranslation } from 'react-i18next';

const DesktopView = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={30} height={30} />
    </View>
  );
};

export default DesktopView;
