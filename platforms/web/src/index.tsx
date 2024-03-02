import { AppRegistry } from "react-native";

import App from "@monorepo/shared/src/App";

AppRegistry.registerComponent("monorepo", () => App);
AppRegistry.runApplication("monorepo", {
  rootTag: document.getElementById("root"),
});
