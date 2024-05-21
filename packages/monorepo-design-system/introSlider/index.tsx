import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  I18nManager,
} from "react-native";
import EdvnzTheme from "@mono-repo/provider";
import { Button, Row, Text } from "@mono-repo/components";
import { spacing } from "@mono-repo/theme";
import { Audit, testProps } from "@mono-repo/utils";
import { Icon } from "@mono-repo/native-icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";

export const IntroSlider = (props) => {
  const { renderItem, data, onDone, screenName } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const flatListRef = useRef(null);

  const rtlSafeIndex = (i) => (isAndroidRTL ? data?.length - 1 - i : i);

  const newRenderItem = (flatListArgs) => {
    const dataProps = { ...flatListArgs, dimensions: { width, height } };
    return width ? (
      <View style={{ width, flex: 1 }}>{renderItem(dataProps)}</View>
    ) : null;
  };

  const onMomentumScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = rtlSafeIndex(Math.round(offset / width));
    if (newIndex === activeIndex) {
      return;
    }
    const lastIndex = activeIndex;
    setActiveIndex(newIndex);
    if (props.onSlideChange) {
      props.onSlideChange(newIndex, lastIndex);
    }
  };

  const goToSlide = (pageNum, triggerOnSlideChange) => {
    flatListRef?.current?.scrollToOffset({
      offset: rtlSafeIndex(pageNum) * width,
    });
    if (triggerOnSlideChange && props.onSlideChange) {
      props.onSlideChange(pageNum, activeIndex);
    }
  };

  const onLayout = ({ nativeEvent }) => {
    const { width: newWidth, height: newHeight } = nativeEvent.layout;
    if (width !== newWidth || height !== newHeight) {
      setWidth(newWidth);
      setHeight(newHeight);
      const func = () => {
        flatListRef?.current?.scrollToOffset({
          offset: activeIndex * width,
          animated: false,
        });
      };
      setTimeout(func, 0);
    }
  };

  const onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const newIndex = Math.round(contentOffset.x / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const onTouchStart = () => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
  };

  const onTouchEnd = () => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
  };

  return (
    <View style={styles.flexOne}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.flatList}
        renderItem={newRenderItem}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onScrollBeginDrag={onTouchStart}
        onScrollEndDrag={onTouchEnd}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onLayout={onLayout}
        initialNumToRender={data?.length}
      />
      <PaginationContainer
        activeIndex={activeIndex}
        data={data}
        goToSlide={goToSlide}
        onDone={onDone}
        rtlSafeIndex={rtlSafeIndex}
        screenName={screenName}
      />
    </View>
  );
};

const PaginationContainer = (props) => {
  const { activeIndex, data, goToSlide, onDone, screenName } = props;
  const isLastSlide = activeIndex === data?.length - 1;

  const { theme } = useContext(EdvnzTheme);
  const handleButton = (buttonStatus) => {
    if (!isLastSlide && !buttonStatus?.previous) {
      goToSlide(activeIndex + 1, true);
      onAudit("splash_next");
    } else if (activeIndex > 0 && buttonStatus?.previous) {
      goToSlide(activeIndex - 1, true);
      onAudit("splash_previous");
    } else {
      onDone();
      onAudit("splash_finish");
    }
  };

  const onAudit = (action) => {
    Audit.logEvent({
      action,
      entityType: "SplashScreen",
      details: {
        screen: screenName || "SplashScreen",
      },
    });
  };

  return (
    <View style={styles.paginationContainer}>
      <SafeAreaView>
        <Row>
          <TouchableOpacity
            style={[
              styles.icon,
              {
                backgroundColor:
                  activeIndex === 0
                    ? theme.colors.textInactive
                    : theme.colors.backgroundSurface,
              },
            ]}
            disabled={activeIndex === 0}
            onPress={() => handleButton({ previous: true })}
            {...testProps(
              `IntroSlider_${TypeofControl.BUTTON_NAVIGATE}_${Behavior.BACK}`
            )}
          >
            <Icon
              name='LeftIcon'
              color={
                activeIndex === 0
                  ? theme.colors.backgroundSurfaceVariant
                  : theme.colors.primary
              }
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text variant='heading5' color={theme.colors.textPrimary}>
              {`${activeIndex + 1}`}
            </Text>
            <Text
              variant='heading5'
              color={theme.colors.textHints}
            >{`/${data?.length}`}</Text>
          </View>
          {activeIndex !== data?.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.icon,
                {
                  backgroundColor: theme.colors.backgroundSurface,
                },
              ]}
              onPress={() => handleButton({ previous: false })}
              {...testProps(
                `IntroSlider_${TypeofControl.BUTTON_NAVIGATE}_${Behavior.NEXT}`
              )}
            >
              <Icon name='RightIcon' color={theme.colors.primary} />
            </TouchableOpacity>
          ) : (
            <Button
              appearance='text'
              label='Finish'
              onPress={handleButton}
              testingProps={{
                screenName: "IntroSlider",
                typeofControl: TypeofControl.BUTTON_CARD,
                behavior: Behavior.SUBMIT,
              }}
              textStyle={{
                color: theme.colors.textLink,
              }}
              size='small'
              textVariant='functional1'
            />
          )}
        </Row>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    flexDirection: isAndroidRTL ? "row-reverse" : "row",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    justifyContent: "center",
  },
  dot: {
    width: 32,
    height: 2,
    borderRadius: 2,
    marginRight: spacing.spacing1,
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
