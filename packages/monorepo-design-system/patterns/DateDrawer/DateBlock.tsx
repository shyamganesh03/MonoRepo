import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@mono-repo/components";
import React, { useRef, useEffect } from "react";
import { testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import { constantMonths } from "./utils";

const DateBlock = (props) => {
  const { value, height, digits, type, onChange, fontSize } = props;
  const dHeight = Math.round(height / 4);

  const offsets = digits.map((_, index) => index * dHeight);

  const scrollRef: any = useRef();

  const snapScrollToIndex = (index) => {
    scrollRef?.current?.scrollTo({ y: dHeight * index, animated: true });
  };

  useEffect(() => {
    setTimeout(() => {
      snapScrollToIndex(value - digits[0]);
    }, 1000);
  }, [scrollRef.current]);

  const handleOnScrollEnd = ({ nativeEvent }) => {
    const digit = Math.round(nativeEvent.contentOffset.y / dHeight + digits[0]);
    onChange(type, digit);
  };

  return (
    <View style={styles.block}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        snapToOffsets={offsets}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={0}
        onScroll={handleOnScrollEnd}
      >
        {digits?.map((v, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => {
                onChange(type, digits[index]);
                snapScrollToIndex(index);
              }}
              {...testProps(
                `DateBlock_${TypeofControl.BUTTON_CARD}_${Behavior.SELECT}`
              )}
            >
              <Text
                variant='heading3'
                color='grey'
                style={[
                  styles.digit,
                  {
                    fontSize: fontSize || 20,
                    marginBottom:
                      index === digits.length - 1
                        ? height / 2 - dHeight / 2
                        : 0,
                    marginTop: index === 0 ? height / 2 - dHeight / 2 : 0,
                    lineHeight: dHeight,
                    height: dHeight,
                  },
                ]}
              >
                {type === "month" ? constantMonths[v - 1] : v}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  digit: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default DateBlock;
