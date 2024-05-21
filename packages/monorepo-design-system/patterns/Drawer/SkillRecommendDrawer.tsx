import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import {
  Behavior,
  EventAction,
  EventEntityType,
  EventSection,
  TypeofControl,
} from "@mono-repo/constants";
import { BlurWidget } from "@mono-repo/blurwidget";
import Toast from "react-native-toast-notifications";
import { Drawer, Text, Button, Tag } from "@mono-repo/components";
import { Icon } from "@mono-repo/native-icons";

const SkillRecommendDrawer = (props) => {
  const {
    data = [],
    data1 = [],
    handleUpdate = () => {},
    hasButton,
    setSoftSkills,
    setTechSkills,
    setVisible,
    visible,
    title,
    description,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const screenHeight = useWindowDimensions().height;
  const [softShowSkillCount, setShowSoftCount] = useState(4);
  const [techShowSkillCount, setShowTechSkillCount] = useState(4);

  const handleSkillsViewMore = (skillType) => {
    if (skillType === "Technical") {
      setShowTechSkillCount(data?.length);
    } else {
      setShowSoftCount(data1?.length);
    }
  };
  const getSelectedSkillCount = (skills) => {
    const count = skills?.filter((item) => item?.selected);
    return count?.length;
  };
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
          onPress={() => setVisible(false)}
          style={{
            flexDirection: "row",
            paddingHorizontal: spacing.spacing5,
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
            {title}
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <Text
            variant='utility2'
            color={theme.colors.textSecondary}
            style={{
              marginBottom: spacing.spacing6,
              paddingTop: spacing.spacing4,
              paddingHorizontal: spacing.spacing5,
            }}
          >
            {description}
          </Text>
          <View>
            <SkillCard
              data={data}
              skill='Technical'
              skillCount={techShowSkillCount}
              setSkill={setTechSkills}
              handleSkillsViewMore={handleSkillsViewMore}
              title='TECHNICAL SKILLS'
              theme={theme}
              dotColor={theme.colors.secondaryVariant3}
              selectedSkillCount={getSelectedSkillCount(data)}
            />
            <View style={{ marginTop: 20 }} />
            <SkillCard
              data={data1}
              skill=''
              skillCount={softShowSkillCount}
              setSkill={setSoftSkills}
              handleSkillsViewMore={handleSkillsViewMore}
              title='SOFT SKILLS'
              theme={theme}
              dotColor={theme.colors.secondary2}
              selectedSkillCount={getSelectedSkillCount(data1)}
            />
          </View>
        </ScrollView>
        {!hasButton && (
          <Button
            label='Add Skills to profile'
            textVariant='bodyBold1'
            style={{
              marginHorizontal: spacing.spacing5,
            }}
            testingProps={{
              screenName: "SkillRecommendDrawer",
              typeofControl: TypeofControl.BUTTON_DRAWER,
              behavior: Behavior.SUBMIT,
            }}
            auditProps={{
              action: EventAction.ADD_YOUR_SKILLS_CLICK,
              entityType: EventEntityType.USER,
            }}
            onPress={() => {
              handleUpdate();
            }}
          />
        )}
      </View>
      <Toast
        ref={(ref) => (global.toast = ref)}
        duration={5000}
        textStyle={{ fontSize: 14 }}
      />
    </Drawer>
  );
};

const SkillCard = ({
  data,
  theme,
  skillCount,
  setSkill,
  handleSkillsViewMore,
  skill,
  title,
  dotColor,
  selectedSkillCount,
}) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <>
      <View style={{ paddingHorizontal: spacing.spacing5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing.spacing5,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: dotColor,
              marginRight: 4,
            }}
          />
          <Text variant='utility1' color={theme.colors.textSecondary}>
            {title}
          </Text>
          <Tag
            tagType='alertTag'
            label={selectedSkillCount}
            bgColor={theme.colors.onAlertContainer}
            style={{
              borderRadius: 10,
              marginLeft: spacing.spacing3,
            }}
            labelColor={theme.colors.backgroundSurface1}
            textVariant='utilityCompact2'
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {data?.slice(0, skillCount)?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{ maxWidth: windowWidth - 62 }}
                key={index.toString()}
                onPress={() => {
                  const dataCheck = data?.map((item2) => {
                    return {
                      ...item2,
                      selected:
                        item2?.skill === item?.skill
                          ? !item2?.selected
                          : item2?.selected,
                    };
                  });
                  setSkill(dataCheck);
                }}
              >
                <Tag
                  divider={false}
                  tagType='skillTag1'
                  label={item?.skill}
                  color={theme.colors.textSecondary}
                  bgColor={
                    item?.selected
                      ? theme.colors.primaryVariant1
                      : theme.colors.backgroundSurface1
                  }
                  labelColor={
                    item?.selected
                      ? theme.colors.onPrimary
                      : theme.colors.textPrimary
                  }
                  iconColor={
                    item?.selected
                      ? theme.colors.onPrimary
                      : theme.colors.textPrimary
                  }
                  style={{
                    alignSelf: "baseline",
                    marginVertical: spacing.spacing2,
                    marginRight: spacing.spacing3,
                    borderRadius: 4,
                  }}
                  iconRight={
                    !item?.selected ? (
                      <View>
                        <Icon
                          color={theme.colors.textLink}
                          height={11.6}
                          name='PlusIcon'
                          width={11.6}
                        />
                      </View>
                    ) : null
                  }
                  hasCloseButton={item?.selected}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* {data?.slice(0, skillCount)?.length < data?.length && (
        <ViewMoreButton
          style={{
            marginBottom: spacing.spacing7,
            marginTop: spacing.spacing6,
          }}
          auditProps={{
            entityType: 'Skills',
            section: EventSection.TECHNICAL_SKILL,
          }}
          onPress={() => handleSkillsViewMore(skill)}
        />
      )} */}
    </>
  );
};

export default SkillRecommendDrawer;
