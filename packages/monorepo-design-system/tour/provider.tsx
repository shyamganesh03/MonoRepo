/* eslint-disable no-return-assign */
import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import { Button, Row, Text } from "@mono-repo/components";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { Provider } from "./context";
import { ArrowUp, ArrowDown } from "./icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";

export const TourProvider = (props) => {
  const {
    steps,
    initialStep,
    highlightComponent,
    onCompletedStep,
    onPrevious,
    scrollViewRef,
    children,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [state, setState] = useState({
    positions: {},
    step: initialStep,
    steps,
  });
  const onNext: any = useRef();

  const OverlayWrapper = highlightComponent || View;

  let activeStep = steps?.[state?.step] || {};
  const { style, overlay } = state?.positions?.[activeStep?.name] || {};

  if (!style || state?.step === null) activeStep = {};

  const goToStep = async (direction) => {
    if (state?.step === null) {
      scrollViewRef?.current?.scrollTo(0);
      return;
    }
    if (onNext.current) {
      onNext.current();
      onNext.current = null;
    }

    let step;
    let hook;
    if (direction === "next") {
      step = steps[state?.step + 1];
      hook = onCompletedStep;
    } else if (direction === "prev") {
      step = steps[state?.step - 1];
      hook = onPrevious;
    }

    if (hook && steps[state?.step]) hook({ step: steps[state?.step] });

    if (step && step.beforeStep) await step.beforeStep();

    let yOffsets = 0;
    if (step) {
      const { style: previousStyle } = state?.positions?.[step?.name] || {};
      if (previousStyle) {
        const windowHeight = Dimensions.get("window").height;
        yOffsets =
          previousStyle.top > windowHeight / 2
            ? previousStyle.top - windowHeight / 2
            : windowHeight / 2 - previousStyle.top;
      }
    }

    scrollViewRef?.current?.scrollTo({ y: yOffsets, animated: false });

    setState({
      ...state,
      step: direction === "next" ? state?.step + 1 : state?.step - 1,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      step: null,
    });
  };

  return (
    <Provider
      value={{
        nextStep: steps[state?.step + 1] || {},
        previousStep: steps[state?.step - 1] || {},
        step: steps[state?.step] ? steps[state?.step] : {},
        onNext: (onNextValue) => (onNext.current = onNextValue),
        start: async () => {
          if (step || step === 0) return;
          const step = steps[0];
          if (step && step.beforeStep) await step.beforeStep();
          setState({ ...state, step: 0 });
        },
        onLayout: (name, fixed, data) => {
          if (state?.step === null) return;
          const windowHeight = Dimensions.get("window").height;

          const activeLayoutStep =
            steps?.find((value) => value?.name === name) || {};
          console.log(activeLayoutStep?.position);
          let yOffsets;
          if (data.style.top > windowHeight / 2) {
            yOffsets = data.style.top - data.style.height / 2;
          } else if (data.style.top < windowHeight / 2) {
            yOffsets = data.style.top + data.style.height / 2;
          }
          if (yOffsets) {
            let top = data.style.height;
            if (fixed && activeLayoutStep?.position === "bottom") {
              top = 0;
            }
            if (fixed && activeLayoutStep?.position === "top") {
              top = windowHeight - data.style.height - 80;
            }

            scrollViewRef?.current?.scrollTo({ y: yOffsets, animated: false });
            const modifiedData = { ...data, style: { ...data.style, top } };
            setState({
              ...state,
              positions: { [name]: modifiedData },
              hideOverlay: false,
            });
          }
        },

        setActive: (stepName) => {
          const step = steps.findIndex((row) => row.name === stepName);
          if (step === -1) return;
          setState({
            ...state,
            step,
          });
        },
      }}
    >
      <View style={styles.container}>
        {children}
        {(state?.step || state?.step === 0) && !state?.hideOverlay ? (
          <Modal transparent>
            <View style={styles.overlay}>
              {activeStep?.name ? (
                <>
                  <View>
                    {overlay ? (
                      <OverlayWrapper style={[styles.highlight, style]}>
                        {overlay}
                      </OverlayWrapper>
                    ) : null}
                  </View>

                  <View
                    style={
                      activeStep?.position === "top"
                        ? {
                            position: "relative",
                            bottom: 0,
                            top:
                              state.positions[activeStep.name]?.style?.top -
                              100,
                            alignItems: "flex-end",
                            marginRight: 80,
                            marginHorizontal: 20,
                          }
                        : {
                            position: "relative",
                            top:
                              state.positions[activeStep.name]?.style?.top +
                              state.positions[activeStep.name]?.style?.height +
                              16,
                            left: 20,
                            right: 20,
                            marginHorizontal: 20,
                          }
                    }
                  >
                    {activeStep?.position === "bottom" ? (
                      <ArrowUp color={theme.colors.onPrimary} />
                    ) : null}

                    <Text
                      variant='heading5'
                      style={{ marginTop: spacing.spacing4 }}
                    >
                      {activeStep?.title}
                    </Text>
                    {activeStep?.position === "top" ? (
                      <ArrowDown color={theme.colors.onPrimary} />
                    ) : null}
                  </View>
                </>
              ) : null}
              <Row
                style={{
                  position: "absolute",
                  bottom: 10,
                  width: "100%",
                  paddingHorizontal: 10,
                }}
              >
                <Button
                  label='Prev'
                  onPress={() => goToStep("prev")}
                  size='small'
                  style={{
                    paddingHorizontal: spacing.spacing6,
                  }}
                  testingProps={{
                    screenName: "ProviderDrawer",
                    typeofControl: TypeofControl.BUTTON_NAVIGATE,
                    behavior: Behavior.BACK,
                  }}
                  status={state?.step === 0 ? "inactive" : "active"}
                />
                <Button
                  label={state?.step > steps?.length - 2 ? "Done" : "Next"}
                  onPress={
                    state?.step > steps?.length - 2
                      ? () => onClose()
                      : () => goToStep("next")
                  }
                  testingProps={{
                    screenName: "ProviderDrawer",
                    typeofControl: TypeofControl.BUTTON_NAVIGATE,
                    behavior:
                      state?.step > steps?.length - 2
                        ? Behavior.NEXT
                        : Behavior.SUBMIT,
                  }}
                  size='small'
                  style={{
                    paddingHorizontal: spacing.spacing6,
                  }}
                />
              </Row>
            </View>
          </Modal>
        ) : null}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)",
    height: "100%",
    paddingTop: 64,
  },
  highlight: {
    zIndex: 20,
    position: "absolute",
  },
});
