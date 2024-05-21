import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { spacing } from "@mono-repo/theme";
import PropTypes from "prop-types";
import EdvnzTheme from "@mono-repo/provider";
import { Audit, testProps } from "@mono-repo/utils";
import { EventAction, TypeofControl } from "@mono-repo/constants";
import Text from "../Text/Text";
import Row from "../Row/Row";

const Tab = (props) => {
  const {
    backgroundTab = 0,
    bgColor,
    data = [],
    setBackgroundTab,
    style,
    textColor,
    auditProps,
    tabColor,
    focusColor,
    indicatorColor,
  } = props;
  const { theme } = useContext(EdvnzTheme);

  const handleAudit = (i) => {
    if (auditProps) {
      Audit.logEvent({
        action: EventAction.TAB_CLICK,
        entityType: auditProps.entityTypeList?.[i],
        details: {
          screen: auditProps?.Screen,
        },
      });
    }
  };

  return (
    <Row
      style={StyleSheet.flatten([
        {
          backgroundColor: bgColor || theme.colors.backgroundSurface2,
        },
        styles.tab,
        style,
      ])}
    >
      {data.map((option, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={[
              {
                backgroundColor:
                  backgroundTab === index
                    ? tabColor || theme.colors.backgroundSurface
                    : "transparent",
              },
              styles.tabItems,
            ]}
            {...testProps(`Tabs_${TypeofControl.BUTTON_TAB}_${index}`)}
            onPress={() => {
              setBackgroundTab(index);
              option?.onPress(index);
              handleAudit(index);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                variant='body2'
                color={
                  backgroundTab === index
                    ? focusColor || theme.colors.onNeutral
                    : textColor
                }
                style={{ textAlign: "center" }}
              >
                {option.title}
              </Text>
              {option?.alertNo > 0 ? (
                <View
                  style={{
                    marginLeft: spacing.spacing3,
                    height: 8,
                    width: 8,
                    borderRadius: 4,
                    backgroundColor:
                      indicatorColor || theme.colors.onAlertContainer,
                  }}
                />
              ) : (
                <View style={{ height: 22 }} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Row>
  );
};

Tab.propTypes = {
  bgColor: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setBackgroundTab: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textColor: PropTypes.string,
};

Tab.defaultProps = {
  bgColor: "",
  data: [
    {
      title: "label1",
      alertNo: 10,
      onPress: () => {},
    },
    {
      title: "label2",
      alertNo: 20,
      onPress: () => {},
    },
  ],
  setBackgroundTab: () => {},
  style: {},
  textColor: "",
};

const styles = StyleSheet.create({
  tab: {
    borderRadius: 104,
    padding: spacing.spacing2,
    width: "100%",
  },
  tabItems: {
    borderRadius: 52,
    flex: 1,
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing3,
    alignItems: "center",
  },
});

export default Tab;
