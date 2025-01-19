import Cookies from "js-cookie";

export const tokenService = {
    getAccessToken: () => Cookies.get("accessToken"),
    getRefreshToken: () => Cookies.get("refreshToken"),
    setAccessToken: (token: string) => Cookies.set("accessToken", token, { secure: true }),
    setRefreshToken: (token: string) => Cookies.set("refreshToken", token, { secure: true }),
    clearTokens: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
    },
};