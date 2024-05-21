import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";
import { RootNavigator } from "@mono-repo/navigation";
import { screenMapping } from "@mono-repo/constants";
import fingerprint from "../fingerPrint";
import { getItemAsync } from "../SecureStore";
import { saveInKinesis } from "../stream";
import Analytics from "../analytics";

const getDefaultHeaders = (body) => ({
  Accept: "application/json",
  "Content-Type":
    body instanceof FormData ? "multipart/form-data" : "application/json",
});

const saveUserAuctionAudit = async (requestBody) => {
  const tempConfig = await getItemAsync("config");
  const { config } = await JSON.parse(tempConfig);
  const token = await getItemAsync("authToken");
  saveInKinesis(requestBody);
  return fetch(
    token
      ? `${config?.apiAuidt}/user-action-audit`
      : `${config?.apiAuidt}/noauth/user-action-audit`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        ...getDefaultHeaders(requestBody),
        ...(await getAuthorizationHeader()),
      },
    }
  );
};

const getAuthorizationHeader = async () => {
  const token = await getItemAsync("authToken");
  return {
    Authorization: `${token}`,
  };
};

class Audit {
  static logEvent = async (body) => {
    const currentRouteName =
      RootNavigator.navigationRef.current.getCurrentRoute().name;
    const tempConfig = await getItemAsync("userProfile");
    const utmMedium = await getItemAsync("utm_medium");
    const utmSource = await getItemAsync("utm_source");
    const utmCampaign = await getItemAsync("utm_campaign");

    function getQueryParam(key, value) {
      if (value === null || value === "null") {
        return {};
      }
      return { [key]: value };
    }

    if (tempConfig) {
      const userProfile = JSON.parse(tempConfig);
      body.userId = userProfile?.userId;
    }
    body.platform = Platform.OS;
    if (Platform.OS !== "web") {
      body.deviceId = DeviceInfo?.getUniqueId();
    } else {
      const visitorId = await fingerprint?.getVisitorId();
      body.visitorId = visitorId;
    }
    body.applicationType = "1";
    body.eventType = body.eventType || "1";
    body.id = uuid.v4();
    body.details = {
      screen: screenMapping?.[currentRouteName],
      ...getQueryParam("utmMedium", utmMedium),
      ...getQueryParam("utmSource", utmSource),
      ...getQueryParam("utmCampaign", utmCampaign),
      ...(body.details || {}),
    };
    body.timestamp = new Date().toISOString();

    await saveUserAuctionAudit(body);
    Analytics.logEvent(body);
  };

  static logEventAsync = async (body) => {
    const tempConfig = await getItemAsync("userProfile");
    if (tempConfig) {
      const userProfile = JSON.parse(tempConfig);
      body.userId = userProfile?.userId;
    }
    body.platform = Platform.OS;
    if (Platform.OS !== "web") {
      body.deviceId = DeviceInfo?.getUniqueId();
    } else {
      const visitorId = await fingerprint?.getVisitorId();
      body.visitorId = visitorId;
    }
    body.applicationType = "1";
    body.eventType = body.eventType || "1";
    body.id = uuid.v4();
    body.timestamp = new Date().toISOString();
    await saveUserAuctionAudit(body);
    Analytics.logEvent(body);
  };
}

export default Audit;
