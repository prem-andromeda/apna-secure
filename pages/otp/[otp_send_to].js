import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { otpFetchUrl, otpPostUrl } from "../../apiUrl/apiUrl";

const Otp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const [otpValidate, setOtpValidate] = useState([]);

  const [rawParams, setRawParams] = useState([]);

  const handleChange = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const mergedOtp = otp.join("");
    // console.log(merged);
    // console.log(otpValidate);
    if (mergedOtp == otpValidate[0].otp_digit) {
      router.push(`/thankyou/${product}`);
      // console.log("form submitted");
    } else {
      alert("Incorrect OTP, Please retry");
    }
  };

  useEffect(() => {
    if (router.query.otp_send_to) {
      router.query.otp_send_to
        .split("&")
        .map((data) => setRawParams((para) => [...para, data.split("=")]));
    }
  }, [router.query.otp_send_to]);

  const { fullName, phoneNumber, product } = Object.fromEntries(rawParams);

  useEffect(() => {
    otpFetch();
  }, [phoneNumber]);

  async function otpFetch() {
    try {
      const res = await fetch(`${otpFetchUrl}${phoneNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // console.log(data);
      data.length > 0 && setOtpValidate((d) => [data[0]]);
      if (data.error) {
        setError((data) => ({ validation: false, database: true }));
      }
    } catch (error) {
      console.log({ error });
    }
  }

  let otpDigit = Math.floor(1000 + Math.random() * 9000);

  async function otpPost() {
    setOtp(new Array(4).fill(""));
    try {
      const res = await fetch(otpPostUrl, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp_digit: otpDigit,
          mobile_no: phoneNumber,
        }),
      });
      const data = await res.json();
      if (data.error) {
        console.log(error);
      } else if (data.response) {
        gupshup();
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function gupshup() {
    const raw = await fetch(
      `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=91${phoneNumber}&msg=${otpDigit}%20is%20the%20OTP%20for%20your%20mobile%20number%20verification%20on%20ApnaPaisa.&msg_type=TEXT&userid=2000020122&auth_scheme=plain&password=!Apna%40Gupshup0506%23&v=1.1&format=text`,
      { mode: "no-cors" }
    );
    const data = await raw;
    alert("OTP Sent");
    otpFetch();
    // console.log({ data });
  }

  return (
    <div>
      <section className="wrapper">
        <div className="container vertical-center">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 text-center">
            <form
              className="rounded bg-white shadow px-2 py-5 p-md-5"
              onSubmit={(e) => submitHandler(e)}
            >
              <h3 className="display-1 text-dark fw-bolder fs-4 mb-2">
                Verify Mobile Number
              </h3>
              <div className="fw-6 text-muted mb-4">
                Hi <span className="fw-bold text-dark">{`${fullName}`}</span>,
                an OTP has been sent on your number {`${phoneNumber}`}{" "}
                <Link href={"/"}>
                  <span className="fw-bold text-primary">Change Number</span>
                </Link>
              </div>
              <div className="otp_input text-start mb-2">
                <label htmlFor="digit">Type your 4 digit security code</label>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  {otp.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        key={index}
                        className="form-control text-center py-2 px-1 p-md-2 mx-1 mx-md-2"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        maxLength={1}
                        required
                      />
                    );
                  })}
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit_btn my-4">
                Submit
              </button>
              <div className="fw-normal text-muted mb-2">
                Didn’t get the code ?
                <Link
                  href="#"
                  className="text-primary fw-bold text-decoration-none"
                  onClick={() => otpPost()}
                >
                  Resend
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Otp);
