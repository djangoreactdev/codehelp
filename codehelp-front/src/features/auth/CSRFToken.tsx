import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

export const config = {
  // prettier-ignore
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  },
};

export const cookie_attributes: any = {
  secure: true,
  sameSite: "strict",
};

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState("");

  useEffect(() => {
    
     // removeCookie("csrftoken");
    // removeCookie("sessionid");

    const csrftoken = getCookie("csrftoken");

    if (csrftoken) {
      setcsrftoken(csrftoken);
      return;
    }
    const CsrfToken = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/auth/csrf_cookie/`
      );
      return response.data;
    };

    const promise = CsrfToken();
    promise.then((data) => {

      setCookie("csrftoken", data.CSRF_COOKIE, cookie_attributes);
      setcsrftoken(data.CSRF_COOKIE);

      // expected output: "Success!"
    });
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
