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

  const _default: { [key: string]: FC<UndrawProps> };
  export default _default;
}

declare module "react-undraw-illustrations/lib/components/UndrawCoding" {
  import { FC } from "react";
  interface UndrawProps {
    primaryColor?: string;
    height?: string;
    style?: import("react").CSSProperties;
  }
  export const UndrawCoding: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawMobileApps" {
  import { FC } from "react";
  interface UndrawProps {
    primaryColor?: string;
    height?: string;
    style?: import("react").CSSProperties;
  }
  export const UndrawMobileApps: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawCloudHosting" {
  import { FC } from "react";
  interface UndrawProps {
    primaryColor?: string;
    height?: string;
    style?: import("react").CSSProperties;
  }
  export const UndrawCloudHosting: FC<UndrawProps>;
  export default FC<UndrawProps>;
}

declare module "react-undraw-illustrations/lib/components/UndrawArtificialIntelligence" {
  import { FC } from "react";
  interface UndrawProps {
    primaryColor?: string;
    height?: string;
    style?: import("react").CSSProperties;
  }
  export const UndrawArtificialIntelligence: FC<UndrawProps>;
  export default FC<UndrawProps>;
}
