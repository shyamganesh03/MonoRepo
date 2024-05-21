import React, { useContext } from "react";
import EdvnzTheme from "@mono-repo/provider";
import { ActivityIndicator, Modal, View } from "react-native";

const Loader = (props) => {
  const { visible, colorVariant = "primaryVariant1" } = props;
  const { theme } = useContext(EdvnzTheme);

  return (
    <Modal
      visible={visible}
      transparent
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <View
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={theme.colors[colorVariant]} size='large' />
      </View>
    </Modal>
  );
};
export default Loader;
