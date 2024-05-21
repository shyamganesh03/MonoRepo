import { TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@mono-repo/native-icons";
import EdvnzTheme from "@mono-repo/provider";
import { testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import TextInput from "../TextInput/TextInput";
import PasswordValidateBox from "./PasswordValidateBox";

const PasswordInput = (props) => {
  const {
    errorMessage,
    hasValidate,
    inputFieldStyle,
    onBlur = () => {},
    onChangeText,
    onFocus = () => {},
    passAllValid,
    setPassAllValid = () => {},
    value,
    testingProps,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [passLetterValidate, setPassLetterValidate] = useState(false);
  const [passNumValidate, setPassNumValidate] = useState(false);
  const [passSpecialValidate, setPassSpecialValidate] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showValidateBox, setShowValidateBox] = useState(false);
  const [validateError, setValidateError] = useState("");

  const PassWordValidatorData = [
    {
      id: 1,
      checkLabel: "Min 6 characters with an Uppercase letter",
      checkStatus: passLetterValidate,
    },
    {
      id: 2,
      checkLabel: "Special character",
      checkStatus: passSpecialValidate,
    },
    {
      id: 3,
      checkLabel: "Numerical value",
      checkStatus: passNumValidate,
    },
  ];

  useEffect(() => {
    setPassSpecialValidate(false);
    setPassLetterValidate(false);
    setPassNumValidate(false);
    setPassAllValid(false);

    const specialRegex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|._-]+/
    );
    const letterLargeRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/
    );
    const numericRegex = new RegExp(/[0-9]/);

    if (specialRegex.test(value)) {
      setPassSpecialValidate(true);
    }
    if (value.length >= 6 && letterLargeRegex.test(value)) {
      setPassLetterValidate(true);
    }
    if (numericRegex.test(value)) {
      setPassNumValidate(true);
    }
    if (
      value.length >= 6 &&
      specialRegex.test(value) &&
      letterLargeRegex.test(value) &&
      numericRegex.test(value)
    ) {
      setPassAllValid(true);
    }
  }, [value]);

  useEffect(() => {
    if (!isFocused) return;
    if (isFocused && hasValidate) {
      setValidateError("");
      setShowValidateBox(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused && !passAllValid) {
      setValidateError("Password dosn’t match guidelines");
    }
    if (!isFocused && passAllValid) {
      setShowValidateBox(false);
    }
  }, [isFocused, passAllValid, value]);

  return (
    <>
      <TextInput
        errorMessage={errorMessage}
        iconRight={
          <PasswordEyeIcon
            setSecureTextEntry={setSecureTextEntry}
            secureTextEntry={secureTextEntry}
            screenName={testingProps?.screenName}
          />
        }
        inputFieldStyle={inputFieldStyle}
        inputLabel='Password'
        labelVariant='body1'
        onBlur={() => {
          onBlur();
          setIsFocused(false);
        }}
        testingProps={testingProps}
        onChangeText={onChangeText}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        placeholder='Password'
        secureTextEntry={secureTextEntry}
        value={value}
        {...props}
      />
      {showValidateBox && (
        <PasswordValidateBox
          data={PassWordValidatorData}
          errorLabel={validateError}
          isFocused={!value?.length > 0}
        />
      )}
    </>
  );
};

const PasswordEyeIcon = ({
  secureTextEntry,
  setSecureTextEntry,
  screenName,
}) => {
  const { theme } = useContext(EdvnzTheme);
  return (
    <TouchableOpacity
      onPress={() => setSecureTextEntry(!secureTextEntry)}
      {...testProps(
        secureTextEntry
          ? `${screenName}_${TypeofControl.BUTTON_ICON}_${Behavior.HIDE_PASSWORD}`
          : `${screenName}_${TypeofControl.BUTTON_ICON}_${Behavior.SHOW_PASSWORD}`
      )}
    >
      <Icon
        name={!secureTextEntry ? "ShowPasswordIcon" : "HidePasswordIcon"}
        color={theme.colors.textPrimary}
        width={20}
        height={20}
      />
    </TouchableOpacity>
  );
};

export default PasswordInput;
