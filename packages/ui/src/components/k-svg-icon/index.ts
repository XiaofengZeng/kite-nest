import { App } from "vue"
import SvgIcon from "./k-svg-icon.vue"

SvgIcon.install = (app: App) => {
  app.component(SvgIcon.name!, SvgIcon)
};

export const KSvgIcon = SvgIcon
export default KSvgIcon;
