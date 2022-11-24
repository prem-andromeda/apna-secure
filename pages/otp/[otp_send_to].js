import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Otp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const [otpValidate, setOtpValidate] = useState([]);

  const [rawParams, setRawParams] = useState([]);

  const changeHandler = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value.replace(/\D/g, "") });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const merged =
      otp.first + "" + otp.second + "" + otp.third + "" + otp.fourth;
    // console.log(merged);
    // console.log(otpValidate[0]);
    if (merged == otpValidate[0].otp_digit) {
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
      const res = await fetch(
        `http://localhost:3000/api/otpVerify?mobile_no=${phoneNumber}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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
    setOtp({
      first: "",
      second: "",
      third: "",
      fourth: "",
    });
    try {
      const res = await fetch("http://localhost:3000/api/otpPost", {
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
      setRes({ ...res, dbRes: false });
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
    // setRes((d)=>{...d,dbRes:false})
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
                  <input
                    type="text"
                    name="first"
                    className="form-control text-center py-2 px-1 p-md-2 mx-1 mx-md-2"
                    value={otp.first}
                    onChange={(e) => changeHandler(e)}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    name="second"
                    className="form-control text-center py-2 px-1 p-md-2 mx-1 mx-md-2"
                    value={otp.second}
                    onChange={(e) => changeHandler(e)}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    name="third"
                    className="form-control text-center py-2 px-1 p-md-2 mx-1 mx-md-2"
                    value={otp.third}
                    onChange={(e) => changeHandler(e)}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    name="fourth"
                    className="form-control text-center py-2 px-1 p-md-2 mx-1 mx-md-2"
                    value={otp.fourth}
                    onChange={(e) => changeHandler(e)}
                    maxLength={1}
                    required
                  />
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

export default Otp;
