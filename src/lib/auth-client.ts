import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  plugins: [
    magicLinkClient(),
    emailOTPClient(),
    inferAdditionalFields(),
    nextCookies(),
  ],
});
