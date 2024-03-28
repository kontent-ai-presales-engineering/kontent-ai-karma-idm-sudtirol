import KontentSmartLink from "@kontent-ai/smart-link"
import { useEffect, useState } from "react";
import { defaultEnvId } from "./utils/env";

export const useSmartLink = () => {
  const [sdk, setSdk] = useState<KontentSmartLink | null>(null);

  useEffect(() => {
    setSdk(KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: defaultEnvId,
        languageCodename: "default",
      }
    }));

    return () => sdk?.destroy()
  }, [sdk]);

  return sdk;
}