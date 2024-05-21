import React from "react";
import {
  Image,
  Text,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
} from "react-native";
import { typography, colors } from "@mono-repo/theme";
import SideBar1 from "assets/newImages/sidebar1.png";
import SideBar2 from "assets/newImages/sidebar2.png";
import SideBar3 from "assets/newImages/sidebar3.png";
import SideBar4 from "assets/newImages/sidebar4.png";
import { Icon } from "@mono-repo/native-icons";

const MobileBackCom = ({ hasLogo }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padd}>
        <Icon
          name='EdvanzaLogo'
          color='#6A00EF'
          width='83.53px'
          height='16px'
        />
        <View style={styles.divider} />
        {hasLogo && (
          <Icon
            name='EdvanzaLogo'
            color={colors.primary.purple700}
            width={140}
          />
        )}
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={SideBar1} style={styles.imgStyle} />
        <Text style={[typography.display1, styles.headerTitle]}>
          Goodbye panic, hello Edvanza
        </Text>
        <Image source={SideBar2} style={styles.imgStyle} />
        <Image source={SideBar3} style={styles.imgStyle} />
        <Image source={SideBar4} style={styles.imgStyle} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#8EFFE4",
    flexDirection: "column",
    overflow: "scroll",
    position: "relative",
  },
  divider: {
    height: 1,
    backgroundColor: "#6A00EF",
    marginTop: 12,
    marginBottom: 5,
  },
  headerTitle: {
    color: "#6A00EF",
    textAlign: "center",
    paddingTop: 18,
    paddingBottom: 16,
  },
  imgStyle: {
    width: 240,
    height: 80,
    resizeMode: "contain",
  },
  padd: {
    paddingHorizontal: 25,
    marginTop: Platform.OS === "web" ? 20 : 10,
  },
});
export default MobileBackCom;
