import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { spacing } from '@libs/theme';
import { Icon } from '../../../icons/output';
import { ThemeProvider } from '@libs/theme';
import Text from '../Text/Text';
import Row from '../Row/Row';

interface TagTypeProps {
  divider?: boolean;
  hasCloseButton?: boolean;
  iconColor?: string;
  iconLeft?: any;
  iconRight?: any;
  label: string;
  labelColor: string;
  pointColor: string;
  tagType: string;
  textVariant: string;
  bgColor?: string;
  style?: string;
}

const TagType = (props: TagTypeProps) => {
  const {
    divider = true,
    hasCloseButton,
    iconColor,
    iconLeft,
    iconRight,
    label,
    labelColor,
    pointColor,
    tagType,
    textVariant,
  } = props;

  const { theme } = useContext(ThemeProvider);
  switch (tagType) {
    case 'modeTag':
      return (
        <>
          {iconLeft && <IconSpacing>{iconLeft}</IconSpacing>}
          <LabelText label={label} labelColor={labelColor} textVariant={textVariant} />
          {iconRight && <IconSpacing>{iconRight}</IconSpacing>}
        </>
      );

    case 'alertTag':
      return (
        <>
          <LabelText label={label} labelColor={labelColor} textVariant={textVariant} />
        </>
      );

    case 'skillTag1':
      return (
        <>
          <LabelText label={label} labelColor={labelColor} textVariant={textVariant} />
          {iconRight && <View style={{ marginLeft: spacing.spacing5 }}>{iconRight}</View>}
          {iconLeft && <View style={{ marginLeft: spacing.spacing5 }}>{iconRight}</View>}
          {divider && (
            <View
              style={{
                backgroundColor: iconColor || theme.colors.textLink,
                height: '100%',
                marginLeft: spacing.spacing5,
                width: 1,
              }}
            />
          )}
          {hasCloseButton && (
            <View style={{ marginLeft: spacing.spacing5 }}>
              <Icon
                color={iconColor || theme.colors.textLink}
                height={11.6}
                name="CloseIcon"
                width={11.6}
              />
            </View>
          )}
        </>
      );

    default: {
      return (
        <Row style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View
              style={[
                {
                  backgroundColor: pointColor,
                },
                styles.pointStyle,
              ]}
            />
            <LabelText label={label} labelColor={labelColor} textVariant={textVariant} />
          </View>

          {iconRight && <View style={{ marginLeft: spacing.spacing5 }}>{iconRight}</View>}
        </Row>
      );
    }
  }
};
const IconSpacing = ({ children }: { children: any }) => (
  <View
    style={{
      paddingRight: spacing.spacing2,
    }}
  >
    {children}
  </View>
);

const LabelText = ({
  textVariant,
  labelColor,
  label,
}: {
  textVariant: string;
  labelColor: string;
  label: string;
}) => (
  <Text style={{ color: labelColor }} variant={textVariant}>
    {label}
  </Text>
);

const Tag = (props: TagTypeProps) => {
  const {
    bgColor,
    divider,
    hasCloseButton,
    iconColor,
    iconLeft,
    iconRight,
    label,
    labelColor,
    pointColor,
    style,
    tagType,
    textVariant,
  } = props;
  return (
    <View
      style={StyleSheet.flatten([
        {
          backgroundColor: bgColor,
        },
        styles[tagType],
        style,
      ])}
    >
      <TagType
        divider={divider}
        hasCloseButton={hasCloseButton}
        iconColor={iconColor}
        iconLeft={iconLeft}
        iconRight={iconRight}
        label={label}
        labelColor={labelColor}
        pointColor={pointColor}
        tagType={tagType}
        textVariant={textVariant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skillTag: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing5,
  },
  skillTag1: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.spacing5,
    paddingVertical: spacing.spacing4,
  },
  pointStyle: {
    borderRadius: 6,
    height: 8,
    marginRight: 8,
    width: 8,
  },
  modeTag: {
    alignSelf: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing2,
  },
  alertTag: {
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing2,
  },
});

Tag.propTypes = {
  bgColor: PropTypes.string,
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelColor: PropTypes.string,
  pointColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tagType: PropTypes.oneOf(['modeTag', 'alertTag', 'skillTag', 'skillTag1']),
  textVariant: PropTypes.string,
};

Tag.defaultProps = {
  bgColor: '#FFF',
  iconLeft: false,
  iconRight: false,
  label: '',
  labelColor: '#FFF',
  pointColor: 'green',
  style: {},
  tagType: 'modeTag',
  textVariant: 'body1',
};

export default Tag;