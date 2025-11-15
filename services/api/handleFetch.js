import Cookies from "js-cookie";

import { axiosInstance } from ".";
import endpoints from "./endpoints";

import { logger } from "../../utilities/general";
import errorHandler from "../../utilities/errorHandler";

const handleFetch = async ({
  endpoint = "",
  extra = "",
  method = "GET",
  auth = false,
  body = {},
  pQuery = {},
  param = "",
  multipart = false,
  useRawResponse = false,
  responseType = "",
  returnErrorData = false,
} = {}) => {
  const headers = {
    "Content-Type": multipart ? "multipart/form-data" : "application/json",
  };

  let url = endpoints[endpoint] || endpoint;

  if (extra) {
    url += `/${extra}`;
  }

  if (param) {
    url += `/${param}`;
  }

  if (pQuery) {
    let paramsArray = Object.keys(pQuery).map(
      (key) =>
        pQuery[key] &&
        `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`,
    );
    paramsArray = paramsArray.filter((item) => item);
    url += `?${paramsArray.join("&")}`;
  }

  if (auth) {
    const storedData = Cookies.get("data");
    const data = storedData && JSON.parse(storedData);
    headers.authorization = `Bearer ${data?.token}`;
  }

  const options = {
    url,
    method,
    headers,
  };

  if (responseType) {
    options.responseType = responseType;
  }

  if (body) {
    options.data = body;
  }

  logger(options);

  if (useRawResponse) {
    try {
      const res = await axiosInstance(options);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  return axiosInstance(options)
    .then((response) =>
      responseType === "blob"
        ? response
        : { ...response.data, method, status: response.status },
    )
    .catch((error) => {
      if (returnErrorData) {
        return { ...error?.response?.data };
      }
      throw new Error(errorHandler(error, auth));
    });
};

export default handleFetch;
