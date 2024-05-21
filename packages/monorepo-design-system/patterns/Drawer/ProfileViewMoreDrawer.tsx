import {
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { BlurWidget } from "@mono-repo/blurwidget";
import { Drawer, Text, Button, Tag } from "@mono-repo/components";
import { Icon } from "@mono-repo/native-icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import { testProps } from "@mono-repo/utils";

const ProfileViewDrawer = (props) => {
  const {
    data,
    visible,
    setVisible,
    handleUpdate = () => {},
    title,
    description,
    field,
    buttonText,
    pointColor,
    hasButton,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const screenHeight = useWindowDimensions().height;
  return (
    <Drawer
      showDrawer={visible}
      setShowDrawer={setVisible}
      showBackground={<BlurWidget variant='blur80' />}
      containerStyle={{ height: (screenHeight / 100) * 90 }}
      isEnable={false}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{
            flexDirection: "row",
            paddingHorizontal: spacing.spacing5,
            paddingTop: spacing.spacing8,
          }}
          {...testProps(
            `ProfileViewMoreDrawer_${TypeofControl.BUTTON_NAVIGATE}_${Behavior.BACK}`
          )}
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
            {title}
          </Text>
        </TouchableOpacity>
        <Text
          variant='utility2'
          color={theme.colors.textSecondary}
          style={{
            marginBottom: spacing.spacing6,
            paddingHorizontal: spacing.spacing5,
          }}
        >
          {description}
        </Text>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ paddingHorizontal: spacing.spacing5 }}
        >
          {data?.map((item, index) => (
            <Tag
              tagType='skillTag'
              label={field ? item[field] : item}
              pointColor={pointColor}
              bgColor={theme.colors.backgroundSurface3}
              labelColor={theme.colors.textPrimary}
              style={{ marginBottom: spacing.spacing3 }}
            />
          ))}
        </ScrollView>
        {hasButton && (
          <Button
            label={buttonText || "update"}
            textVariant='bodyBold1'
            style={{
              marginTop: spacing.spacing6,
              marginBottom: spacing.spacing2,
              marginHorizontal: spacing.spacing5,
            }}
            testingProps={{
              screenName: "ProfileViewMoreDrawer",
              typeofControl: TypeofControl.BUTTON_DRAWER,
              behavior: Behavior.UPDATE,
            }}
            onPress={() => {
              setVisible(!visible);
              handleUpdate();
            }}
          />
        )}
      </View>
    </Drawer>
  );
};

export default ProfileViewDrawer;
