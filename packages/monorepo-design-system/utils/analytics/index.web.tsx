import ReactGA from "react-ga4";
// import smartlookClient from 'smartlook-client'
import ReactPixel from "react-facebook-pixel";
import branch from "branch-sdk";
import { EventAction } from "@mono-repo/constants";

const BranchEvents = [
  EventAction.SIGN_UP_COGNITO,
  EventAction.SIGN_UP_COGNITO_TRY,
  EventAction.SIGN_UP_FACEBOOK,
  EventAction.SIGN_UP_FACEBOOK_TRY,
  EventAction.SIGN_UP_GOOGLE,
  EventAction.SIGN_UP_GOOGLE_TRY,
  EventAction.SIGN_UP_APPLE,
  EventAction.SIGN_UP_APPLE_TRY,
];

class Analytics {
  static init() {}

  static logScreenView = async (currentRouteName) => {
    ReactGA.initialize("G-1GS27Y0EPF");
    ReactGA.set({ page: currentRouteName });
    ReactGA.pageview(currentRouteName);
  };

  static logEvent = (body) => {
    ReactGA.initialize("G-1GS27Y0EPF");
    ReactGA.event({
      category: body.entityType,
      action: body.action,
      label: body.details?.accessCode
        ? body.details.accessCode
        : body.entityId?.toString(),
    });
    if (BranchEvents.includes(body.action)) {
      branch.logEvent(body.action, { ...body });
    }
    // smartlookClient.track(
    //   `${body.entityType}_${body.action?.replace('-', '')}`,
    //   body,
    // )
    ReactPixel.trackSingleCustom("1028233148044873", body.entityType, body);
    ReactGA.event({
      category: body.entityType,
      action: body.action,
      label: body.details?.accessCode
        ? body.details.accessCode
        : body.entityId?.toString(),
    });
    if (
      body.action === "SignUp-Cognito" ||
      body.action === "SignUp-Google" ||
      body.action === "SignUp-Facebook"
    ) {
      window.lintrk("track", { conversion_id: 7196681 });
      window.rdt("track", "SignUp");
      window.twttr.conversion.trackPid("o7uyi", {
        tw_sale_amount: 0,
        tw_order_quantity: 0,
      });
    }
  };

  static onSignIn = async (userObject) => {
    const { userId } = userObject;
    console.log({ userId });
    ReactGA.set({ userId });

    // smartlookClient.setUserIdentifier(userId, {
    //   email: userObject.email,
    //   name: userObject.firstName,
    // })
    // smartlookClient.identify(userId)
  };

  static initializeUXcam = () => {
    // smartlookClient.init('f6541d278c6e2ad4370b6c86c978fc41c96aba91')
  };
}

export default Analytics;
