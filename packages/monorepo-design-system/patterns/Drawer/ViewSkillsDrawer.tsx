import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { BlurWidget } from "@mono-repo/blurwidget";
import { Drawer, Text, Row, Button } from "@mono-repo/components";
import { Icon } from "@mono-repo/native-icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const ViewSkillsDrawer = (props) => {
  const {
    showSkillDrawer,
    setShowSkillDrawer,
    skills = [
      "Figma",
      "Responsive UI",
      "Information Architecture",
      "Mobile Applications",
      "Adobe Cloud",
      "User Interface",
      "Wireframing",
      "Product Knowledge",
    ],
    setShowDrawer,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const screenHeight = useWindowDimensions().height;
  return (
    <Drawer
      showDrawer={showSkillDrawer}
      showBackground={<BlurWidget variant='blur80' />}
      setShowDrawer={setShowDrawer}
      containerStyle={{ height: (screenHeight / 100) * 90 }}
    >
      <TouchableOpacity
        onPress={() => setShowSkillDrawer(false)}
        style={{
          flexDirection: "row",
          paddingHorizontal: spacing.spacing5,
          paddingTop: spacing.spacing8,
        }}
      >
        <Icon
          name='LeftIcon'
          color={theme.colors.textPrimary}
          width={20}
          height={20}
        />
        <Text
          style={{ paddingHorizontal: spacing.spacing5 }}
          variant='heading2'
          color={theme.colors.textPrimary}
        >
          Your Technical Skills
        </Text>
      </TouchableOpacity>
      <View>
        {skills?.map((item, index) => (
          <ScrollView>
            <View style={styles(theme).skillCard}>
              <View style={styles(theme).bullet} />
              <Text
                variant='bodyCompact2'
                color={theme.colors.textPrimary}
                style={{ paddingVertical: spacing.spacing5 }}
              >
                {item}
              </Text>
            </View>
          </ScrollView>
        ))}

        <Button
          label='Update technical skills'
          textVariant='bodyBold1'
          style={{
            marginTop: 24,
            marginBottom: 40,
          }}
          testingProps={{
            screenName: "ViewDrawer",
            typeofControl: TypeofControl.BUTTON_DRAWER,
            behavior: Behavior.UPDATE,
          }}
          onPress={() => {}}
        />
      </View>
    </Drawer>
  );
};
const styles = (theme) =>
  StyleSheet.create({
    bullet: {
      width: 8,
      height: 8,
      borderRadius: 50,
      margin: 8,
      backgroundColor: theme.colors.secondaryVariant3,
    },
    skillCard: {
      backgroundColor: theme.colors.backgroundSurface2,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: spacing.spacing5,
      paddingHorizontal: spacing.spacing3,
    },
  });
export default ViewSkillsDrawer;
