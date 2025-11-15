/* eslint-disable @typescript-eslint/no-unused-vars */
import mem from "mem";
import axios from "axios";
import Cookies from "js-cookie";

import { logout } from "../auth";
import endpoints from "./endpoints";
import { logger } from "../../utilities/general";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshTokenFn() {
  const storedData = Cookies.get("data");
  const data = storedData && JSON.parse(storedData);
  console.log(data, "stored data in refresh token"

  );
  
  try {
    const url = `${endpoints.auth}/refresh-token`;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      expiredToken: data?.token,
      refreshToken: data?.refreshToken,
    };

    const response = await axios({
      url,
      headers,
      method: "POST",
      data: body,
    });

    logger(response);

    const { data: session } = response.data;

    if (!session?.token) {
      logout();
    }

    Cookies.set("data", JSON.stringify({ ...data, ...session }), {
      secure: true,
      sameSite: "strict",
    });
    return session;
  } catch (error) {
    logout();
  }
}

export const memoizedRefreshToken = mem(refreshTokenFn, { maxAge: 500000 });
