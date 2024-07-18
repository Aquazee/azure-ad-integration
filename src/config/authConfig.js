import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
export const msalConfig = {
    auth: {
        clientId: "----36 character alphanumberic id -----",
        authority:"https://login.microsoftonline.com/{add_your_client_id}",
        redirectUri: `/`, //eg: ${window.location.origin}/Dashboard
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "sessionStorage", // "sessionStorage" or"localStorage"
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
        allowNativeBroker: false,
    },
};

export const logoutRequest = (accountToSignOut) => ({
    account: accountToSignOut,
    mainWindowRedirectUri: "/",
    postLogoutRedirectUri: "/",
});