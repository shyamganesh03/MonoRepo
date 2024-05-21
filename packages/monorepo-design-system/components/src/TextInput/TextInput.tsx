import { TextInput as Input, View } from "react-native";
import React, { useState, useContext } from "react";
import { spacing } from "@mono-repo/theme";
import PropTypes from "prop-types";
import { Icon } from "@mono-repo/native-icons";
import EdvnzTheme from "@mono-repo/provider";
import { testProps, Audit } from "@mono-repo/utils";
import { EventAction, TypeofControl } from "@mono-repo/constants";
import Text from "../Text/Text";
import Row from "../Row/Row";
import { styles } from "./styles";

const TextInput = (props) => {
  const { theme } = useContext(EdvnzTheme);
  const {
    auditProps,
    errorMessage = "",
    iconLeft,
    iconRight,
    inputFieldStyle,
    inputLabel = "",
    inputRef,
    isMandatory,
    onBlur = () => {},
    onChangeText,
    onFocus = () => {},
    onSubmitEditing = () => {},
    placeholder = "",
    value,
    testingProps,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleInputOnFocus = async () => {
    if (auditProps) {
      Audit.logEvent({
        action: EventAction.FOCUS_IN,
        entityType: "UI",
        entityId: "",
        eventType: "2",
        details: {
          fieldName: auditProps?.actionName,
          keyword: auditProps?.searchKeyword,
          screen: auditProps?.screen,
        },
      });
    }
    onFocus();
    setIsFocused(true);
  };
  const handleInputOutFocus = async () => {
    if (auditProps) {
      Audit.logEvent({
        action: EventAction.FOCUS_OUT,
        entityType: "UI",
        entityId: "",
        eventType: "2",
        details: {
          fieldName: auditProps?.actionName,
          keyword: auditProps?.searchKeyword,
          screen: auditProps?.screen,
        },
      });
    }
    onBlur();
    setIsFocused(false);
  };
  const hasError = errorMessage?.length > 0;
  return (
    <>
      {!!inputLabel && (
        <Text
          style={styles.inputLabelStyle}
          color={theme.colors.textPrimary}
          variant='body1'
        >
          {inputLabel}
          {isMandatory && <Text color={theme.colors.textPrimary}>*</Text>}
        </Text>
      )}

      <Row
        style={[getInputOutline(hasError, isFocused, theme), inputFieldStyle]}
      >
        {iconLeft && <View style={{ paddingLeft: 16 }}>{iconLeft}</View>}
        <Input
          autoCorrect={false}
          ref={inputRef}
          placeholder={placeholder}
          style={[
            styles.inputStyle,
            { width: "100%" },
            {
              color: hasError
                ? theme.colors.alertBorder
                : theme.colors.textPrimary,
            },
          ]}
          onChangeText={(text) => onChangeText(text)}
          placeholderTextColor={theme.colors.textHints}
          value={value}
          onSubmitEditing={onSubmitEditing}
          {...testProps(
            `${testingProps?.screenName}_${TypeofControl.INPUT}_${testingProps?.behavior}`
          )}
          {...props}
          onFocus={handleInputOnFocus}
          onBlur={handleInputOutFocus}
        />
        {iconRight && <View style={{ paddingRight: 16 }}>{iconRight}</View>}
      </Row>
      {hasError && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing.spacing5,
          }}
        >
          <Icon
            name='ExclamationErrorIcon'
            height={13.33}
            width={13.33}
            color={theme.colors.alertBorder}
            style={{
              marginRight: spacing.spacing2,
            }}
          />
          <Text color={theme.colors.alertBorder} variant='utility2'>
            {errorMessage}
          </Text>
        </View>
      )}
    </>
  );
};

const getInputOutline = (hasError, isFocused, theme) => {
  const containStyle: any[] = [
    {
      borderWidth: 1,
      borderColor: theme?.colors.textPrimary,
      borderRadius: 4,
      height: 48,
      alignItems: "center",
      width: "100%",
    },
  ];

  if (hasError) {
    containStyle.push({
      borderColor: theme.colors.alertBorder,
    });
  } else if (isFocused) {
    containStyle.push({
      borderWidth: 2,
    });
  } else {
    containStyle.push({
      backgroundColor: "transparent",
    });
  }

  return containStyle;
};

TextInput.protoTypes = {
  errorMessage: PropTypes.string,
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  inputFieldStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputLabel: PropTypes.string,
  isMandatory: PropTypes.bool,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

TextInput.defaultProps = {
  errorMessage: "",
  iconLeft: false,
  iconRight: false,
  inputFieldStyle: {},
  inputLabel: "",
  isMandatory: false,
  onBlur: () => {},
  onChangeText: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  placeholder: "",
  value: "",
};

export default TextInput;
