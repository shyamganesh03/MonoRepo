import { View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Drawer, Text, TextInput, Button, Row } from "@mono-repo/components";
import { BlurWidget } from "@mono-repo/blurwidget";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { colors, spacing } from "@mono-repo/theme";
import { InputDrawer, LoginPopup } from "@mono-repo/patterns";
import { ProfileIcon, ProfileName } from "@mono-repo/card";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import { testProps } from "@mono-repo/utils";

const FlagPostDrawer = (props) => {
  const {
    flagList,
    handleFlagContent,
    selectedPost,
    setShowDrawer,
    showDrawer,
    title,
    goBack = false,
    hasNoGOBack = false,
    profile,
  } = props;
  const [issueDisplay, setIssueDisplay] = useState<any>();
  const [userIssueType, setUserIssueType] = useState("");
  const [showFlagList, setShowFlagList] = useState(false);
  const [flagPopup, setFlagPopup] = useState(false);
  const [description, setDescription] = useState("");
  const { theme } = useContext(EdvnzTheme);

  const flagListArray = flagList?.map((item) => item?.itemValue?.displayName);
  const issueDisplayList = flagList?.map(
    (item) => item?.itemValue?.storageValue
  );

  const handleSubmit = () => {
    const dataNew = {
      ...selectedPost,
      userIssueType,
      description,
    };
    handleFlagContent(dataNew);
    setFlagPopup(true);
    resetState();
  };

  const resetState = () => {
    setDescription("");
    setIssueDisplay(null);
  };

  const checkActive = () => {
    if (!issueDisplay) return false;
    if (issueDisplay !== "Others" || description) return true;
    return false;
  };

  return (
    <Drawer
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
      showBackground={
        <BlurWidget
          variant='blur80'
          onPress={() => setShowDrawer(!showDrawer)}
        />
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: spacing.spacing6,
          marginBottom: spacing.spacing4,
          paddingHorizontal: spacing.spacing5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowDrawer(false);
          }}
          {...testProps(`FlagPost_${TypeofControl.BUTTON}_${Behavior.CLOSE}`)}
        >
          <Icon
            name='LeftIcon'
            color={theme.colors.textPrimary}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <Text
          variant='heading2'
          color={theme.colors.textPrimary}
          style={{
            marginLeft: spacing.spacing5,
          }}
        >
          {title}
        </Text>
      </View>
      {profile && (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <ProfileIcon imageUrl={profile?.imageUrl} size={96} />
          <View style={{ marginTop: spacing.spacing4 }}>
            <ProfileName
              userProfile={profile}
              textVariant='heading2'
              textColor={colors.onNeutral}
            />
          </View>
          <Row
            style={{
              justifyContent: "center",
              flexWrap: "wrap",
              paddingTop: 5,
            }}
          >
            <Text color={colors.backgroundSurface2}>
              {profile?.jobTitle || "🤔 Role"}
            </Text>
            <Text
              color={colors.backgroundSurface2}
              style={{
                marginHorizontal: spacing.spacing2,
              }}
            >
              •
            </Text>
            {Boolean(profile?.state) && (
              <Text color={colors.backgroundSurface2}>{profile?.state} , </Text>
            )}
            {Boolean(profile?.country) && (
              <Text color={colors.backgroundSurface2}>{profile?.country}</Text>
            )}
          </Row>
        </View>
      )}
      <View
        style={{
          marginTop: spacing.spacing6,
          marginBottom: spacing.spacing4,
          paddingHorizontal: spacing.spacing5,
        }}
      >
        <InputDrawer
          labelVariant='body1'
          DrawerHeader='Please select an issue'
          drawerTitle='Select an Issue'
          placeholder='Select'
          showDrawer={showFlagList}
          setShowDrawer={setShowFlagList}
          showBackground={<BlurWidget variant='blur80' />}
          iconRight={
            <Icon
              name='ChevronDownIcon'
              color={theme.colors.textHints}
              width={17}
              height={17}
            />
          }
          data={flagListArray}
          value={issueDisplay}
          onSelect={(index) => {
            setIssueDisplay(flagListArray[index.row]);
            setUserIssueType(issueDisplayList[index.row]);
          }}
        />
        <TextInput
          labelVariant='body1'
          inputLabel='Tell Us More'
          placeholder='Type here'
          multiline
          maxLength={1001}
          inputFieldStyle={{
            height: 120,
            marginBottom: spacing.spacing9,
            paddingBottom: 4,
          }}
          onChangeText={setDescription}
          value={description}
          textAlignVertical='top'
        />
        <Button
          label='Submit'
          onPress={() => handleSubmit()}
          status={checkActive() ? "active" : "inactive"}
          testingProps={{
            screenName: "FlagPostDrawer",
            typeofControl: TypeofControl.BUTTON_DRAWER,
            behavior: Behavior.SUBMIT,
          }}
          style={{
            paddingHorizontal: 16,
          }}
          textVariant='functional1'
        />
        {hasNoGOBack && (
          <LoginPopup
            heading='Thank you for updating us!'
            content='Our admin team will get this sorted at the earliest!'
            buttonText='Ok'
            visible={flagPopup}
            setVisible={setFlagPopup}
            onPress={() => {
              setShowDrawer(!showDrawer);
            }}
          />
        )}

        {goBack && (
          <LoginPopup
            heading='Thank you for updating us!'
            content='Our admin team will get this sorted at the earliest!'
            buttonText='Ok'
            visible={flagPopup}
            setVisible={setFlagPopup}
            onPress={() => {
              setShowDrawer(!showDrawer);
              goBack();
            }}
          />
        )}
      </View>
    </Drawer>
  );
};

export default FlagPostDrawer;
