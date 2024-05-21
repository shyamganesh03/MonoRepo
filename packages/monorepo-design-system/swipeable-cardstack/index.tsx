import { Behavior, TypeofControl } from "@mono-repo/constants";
import { testProps } from "@mono-repo/utils";
import React, { useRef, useEffect, useState } from "react";
import {
  PanResponder,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";

const HORIZONTAL_SWIPE_THRESHOLD = 100;

export const SwipeableCardStack = (props) => {
  const {
    data,
    renderItem,
    setCurrentActiveModule,
    currentStackedViewIndex,
    setCurrentStackedViewIndex,
    scrollRef,
    topHeight,
    isScrollBeginDrag,
    scrollY,
    initialState,
    textHeight,
  } = props;

  const [stackSpacing, setStackSpacing] = useState(20);
  const [scaleOutPutRange, setScaleOutPutRange] = useState(0.02);

  useEffect(() => {
    if (initialState) return;
    if (scrollY > 100) {
      setScaleOutPutRange(0.02);
      setStackSpacing(20);
      return;
    }

    if (scrollY < 100) {
      setScaleOutPutRange(scrollY / 5000);
      setStackSpacing(40 - scrollY / 5);
    }
    if (scrollY < 1) {
      setScaleOutPutRange(0);
      setStackSpacing(40);
    }
  }, [scrollY, isScrollBeginDrag]);

  useEffect(() => {
    setCurrentActiveModule(
      data?.find((_, index) => index === currentStackedViewIndex)?.moduleName
    );
  }, [currentStackedViewIndex]);

  return (
    <View
      style={{
        paddingTop: stackSpacing * (data?.length - 1) || 0,
        alignItems: "center",
      }}
    >
      {data?.map((item, index) => (
        <Card
          currentStackedViewIndex={currentStackedViewIndex}
          index={index}
          item={item}
          renderItem={renderItem}
          setCurrentStackedViewIndex={setCurrentStackedViewIndex}
          stackSpacing={stackSpacing}
          total={data?.length}
          scrollRef={scrollRef}
          topHeight={topHeight}
          textHeight={textHeight}
          scaleOutPutRange={scaleOutPutRange}
          isScrollBeginDrag={isScrollBeginDrag}
          scrollY={scrollY}
        />
      ))}
    </View>
  );
};

const Card = (props) => {
  const {
    currentStackedViewIndex,
    index,
    item,
    renderItem,
    setCurrentStackedViewIndex,
    stackSpacing,
    total,
    topHeight,
    scrollRef,
    scaleOutPutRange,
    scrollY,
    textHeight,
  } = props;

  // State to keep track of the current stacked view
  const viewStackedAnim = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get("screen").width;
  // State to keep track of the current pan position
  const panX = useRef(new Animated.Value(0)).current;

  const rotate = useRef(new Animated.Value(0)).current;

  const opacity = useRef(new Animated.Value(1)).current;

  const fadeInAnim = Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  });

  // Animation to reset position of the current pan position
  const resetPositionAnim = Animated.spring(panX, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  });

  const translateX = panX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-1, 0, 1],
  });

  const rotateValue = rotate.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "10deg"],
  });

  const closeRotate = Animated.timing(rotate, {
    toValue: 0,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: false,
  });
  const getCurrentPosition = () => {
    return (index - currentStackedViewIndex + total) % total;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > 5 || Math.abs(dx) > Math.abs(dy)) {
          scrollRef.current.setNativeProps({ scrollEnabled: false });
          return true;
        }
      },
      onPanResponderMove: (event, gestureState) => {
        // Callback for pan responder move
        panX.setValue(gestureState.dx);
        rotate.setValue(gestureState.dx);
      },
      onPanResponderTerminate: (event, gestureState) =>
        onPanResponderRelease(event, gestureState),
      onPanResponderRelease: (event, gestureState) =>
        onPanResponderRelease(event, gestureState),
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false,
    })
  ).current;
  // Callback for pan responder release
  const onPanResponderRelease = (event, gestureState) => {
    scrollRef.current.setNativeProps({ scrollEnabled: true });

    // Check if there's at least one item in the data array
    if (total > 0) {
      // Check if the swipe is greater than the horizontal swipe threshold
      if (
        ((gestureState.dx > HORIZONTAL_SWIPE_THRESHOLD ||
          gestureState.dx < -HORIZONTAL_SWIPE_THRESHOLD) &&
          total > 1) ||
        (Math.abs(gestureState.dx) > 0 && Math.abs(gestureState.vx) > 2)
      ) {
        Animated.timing(panX, {
          toValue: gestureState.dx < 0 ? -Math.abs(screenWidth) : screenWidth,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setCurrentStackedViewIndex(getCurrentPosition());
          panX.setValue(0);
          rotate.setValue(0);
        });

        // Reset the pan state
      } else {
        Animated.parallel([closeRotate, resetPositionAnim]).start();
      }
    }
  };

  const getScaleOutPutRange = () => {
    if (currentStackedViewIndex === index) {
      return [1, 1];
    }

    const x = 1 - scaleOutPutRange * getCurrentPosition(index);
    const y = x - scaleOutPutRange;

    return [x, y];
  };

  const handleAnimation = () => {
    scrollRef.current?.scrollTo({
      y: topHeight - textHeight,
      animated: true,
    });
    setTimeout(() => {
      panX.setValue(100);
      rotate.setValue(100);
      opacity.setValue(0);
      setCurrentStackedViewIndex(index);
      Animated.parallel([closeRotate, resetPositionAnim, fadeInAnim]).start();
    }, 500);
  };
  if (currentStackedViewIndex !== index) {
    return (
      <Animated.View
        key={index.toString()}
        style={[
          {
            width: "100%",
            height: 600,
            overflow: "hidden",
            position: "absolute",
            zIndex: total - getCurrentPosition(),
            transform: [
              {
                scale: viewStackedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: getScaleOutPutRange(),
                }),
              },
            ],
            top: viewStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                (total - getCurrentPosition(index) - 1) * stackSpacing,
                (total - getCurrentPosition(index) - 1) * stackSpacing,
              ],
            }),
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={stackSpacing > 30 ? handleAnimation : () => {}}
          {...testProps(
            `SwipeCard_${TypeofControl.BUTTON_CARD}_${Behavior.TRIGGER_ACTION}`
          )}
        >
          {renderItem(item)}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  const isSwipe = () => {
    if (scrollY > topHeight / 3 && scrollY < topHeight) return true;
    if (scrollY > topHeight) return false;

    return false;
  };
  return (
    <Animated.View
      key={index.toString()}
      {...(isSwipe() ? panResponder.panHandlers : {})}
      style={[
        {
          opacity,
          width: "100%",
          position: "relative",
          zIndex: total - getCurrentPosition(index),
          transform: [
            { translateX },
            {
              scale: viewStackedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: getScaleOutPutRange(),
              }),
            },
            { rotate: rotateValue },
          ],
          top: viewStackedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              getCurrentPosition(index) * stackSpacing,
              getCurrentPosition(index) * stackSpacing,
            ],
          }),
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          scrollRef.current?.scrollTo({
            y: topHeight - textHeight,
            animated: true,
          })
        }
        {...testProps(
          `SwipeCard_${TypeofControl.BUTTON_CARD}_${Behavior.SCROLL}`
        )}
      >
        {renderItem(item)}
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
