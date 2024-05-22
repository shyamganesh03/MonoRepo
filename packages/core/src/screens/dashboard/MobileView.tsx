import { View, Text } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@libs/native-icons';

const MobileView = () => {
  const { t } = useTranslation();

  return (
    <View style={{ width: 200 }}>
      <Text>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={20} height={20} color={'black'} />
    </View>
  );
};

export default MobileView;
