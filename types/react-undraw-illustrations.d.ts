declare module "react-undraw-illustrations" {
  import { FC } from "react";

  interface UndrawProps {
    primaryColor?: string;
    height?: string;
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
