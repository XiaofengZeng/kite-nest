import { App } from "vue";
import * as components from "./components";

const KiteUI = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
}

export default KiteUI