import {
  View,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  BackHandler,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { Text } from "@mono-repo/components";
import { BlurWidget } from "@mono-repo/blurwidget";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { spacing, typography } from "@mono-repo/theme";
import { IntroSlider } from "@mono-repo/intro-slider";
import { ScreenLayout, testProps } from "@mono-repo/utils";
import { SvgAnimation } from "./SvgAnimation";
import { LottieAnimation } from "./LottieAnimation";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const TutorialSplash = (props) => {
  const {
    data,
    isVisible,
    onClose = () => {},
    isCareer,
    screenName,
    hasClose = true,
  } = props;
  const { theme } = useContext(EdvnzTheme);

  const windowWidth = useWindowDimensions().width;

  const windowHeight = useWindowDimensions().height;

  const isDesktop = ScreenLayout?.isWeb(windowWidth);

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.wrapper]}>
        {hasClose && (
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: 24,
              marginTop: (windowHeight * (item?.animationUrl ? 13 : 50)) / 100,
            }}
            {...testProps(
              `TutorialSplash_${TypeofControl.BUTTON}_${Behavior.CLOSE}`
            )}
          >
            <Icon
              name='CloseIcon'
              color={theme.colors.textPrimary}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.backgroundSurface1,
              height: item?.animationUrl ? "82%" : "45%",
            },
          ]}
        >
          <View style={{ height: "100%" }}>
            {item?.topImage ? (
              <View style={{ position: "absolute", top: 0 }}>
                <Image
                  source={{ uri: item?.topImage?.url }}
                  resizeMode='contain'
                  style={styles.splashImage}
                />
              </View>
            ) : null}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View
                style={{
                  marginTop: 110,
                }}
              >
                {!isCareer && index === 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: spacing.spacing5,
                      paddingTop: spacing.spacing6,
                    }}
                  >
                    <Icon
                      name='Alarm'
                      width='16'
                      height='16'
                      color={theme.colors.textHints}
                    />
                    <Text
                      style={[
                        typography.body2,
                        {
                          color: theme.colors.textHints,
                          paddingLeft: spacing.spacing3,
                        },
                      ]}
                    >
                      15 second guided tour
                    </Text>
                  </View>
                ) : null}
                {item?.title ? (
                  <Text
                    variant='heading1'
                    color={theme.colors.textPrimary}
                    style={{
                      paddingHorizontal: spacing.spacing5,
                      marginTop:
                        !isCareer && index === 0
                          ? spacing.spacing3
                          : spacing.spacing7,
                    }}
                  >
                    {`${item?.title}`}
                  </Text>
                ) : null}
                {item?.description ? (
                  <Text
                    variant='body1'
                    color={theme.colors.textPrimary}
                    style={{
                      marginTop: spacing.spacing3,
                      paddingHorizontal: spacing.spacing5,
                    }}
                  >
                    {item?.description}
                  </Text>
                ) : null}
              </View>
              {item?.animationUrl && (
                <View
                  style={{
                    flex: 1,
                    marginVertical: spacing.spacing6,
                    alignItems: "center",
                  }}
                >
                  {Platform.OS === "android" ? (
                    <LottieAnimation animationUrl={item?.animationData} />
                  ) : (
                    <SvgAnimation
                      animationUrl={item?.animationUrl}
                      webData={item?.webData}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Modal
      animation
      visible={isVisible}
      transparent
      onRequestClose={() => BackHandler.exitApp()}
    >
      <View style={{ flexDirection: "row", height: "100%", width: "100%" }}>
        {isDesktop && <View style={{ maxWidth: 475, width: "100%" }} />}
        <View style={{ flex: 1 }}>
          <BlurWidget variant='blur80' />
          <IntroSlider
            renderItem={renderItem}
            data={data}
            onDone={onClose}
            screenName={screenName}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  splashImage: {
    position: "absolute",
    top: -106,
    left: 16,
    height: 200,
    width: 220,
    paddingHorizontal: spacing.spacing5,
  },
  wrapper: {
    height: Dimensions.get("window").height,
    width: "100%",
  },
  container: {
    position: "absolute",
    marginTop: 83,
    width: "100%",
    bottom: 0,
    paddingTop: spacing.spacing3,
    paddingBottom: spacing.spacing9,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default TutorialSplash;
