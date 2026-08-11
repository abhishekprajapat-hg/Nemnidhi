declare module "react-undraw-illustrations" {
  import { FC } from "react";

  interface UndrawProps {
    primaryColor?: string;
    height?: string;
    style?: React.CSSProperties;
    class?: string;
  }

  export const UndrawCoding: FC<UndrawProps>;
  export const UndrawMobileApps: FC<UndrawProps>;
  export const UndrawCloudHosting: FC<UndrawProps>;
  export const UndrawArtificialIntelligence: FC<UndrawProps>;
  export const UndrawBrainstorming: FC<UndrawProps>;
  export const UndrawWireframing: FC<UndrawProps>;
  export const UndrawProgramming: FC<UndrawProps>;
  export const UndrawQaEngineers: FC<UndrawProps>;
  export const UndrawRising: FC<UndrawProps>;

  // Catch-all for any other illustration
  const _default: { [key: string]: FC<UndrawProps> };
  export default _default;
}

// Deep-path imports for tree-shaken usage in ServicesTimeline
declare module "react-undraw-illustrations/lib/components/UndrawDashboard" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawDashboard: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawDevices" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawDevices: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawServer" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawServer: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawData" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawData: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawBrainstorming" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawBrainstorming: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawWireframing" {
  import { FC } from "react";
  interface UndrawProps { primaryColor?: string; height?: string; style?: import("react").CSSProperties; }
  export const UndrawWireframing: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

