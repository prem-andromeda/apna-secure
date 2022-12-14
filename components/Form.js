import { useRouter } from "next/router";
import React, { useState } from "react";
import { otpPostUrl, postDataUrl } from "../apiUrl/apiUrl";

const Form = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    city: "",
    product: "",
    email: "",
    mobileNo: "",
  });

  const changeHandler = (e) => {
    e.target.name == "mobileNo"
      ? setForm({ ...form, [e.target.name]: e.target.value.replace(/\D/g, "") })
      : e.target.name == "email" || e.target.name == "product"
      ? setForm({ ...form, [e.target.name]: e.target.value })
      : setForm({
          ...form,
          [e.target.name]: e.target.value.replace(/[^a-z]/gi, ""),
        });
  };

  // console.log(form.mobileNo);
  async function postData() {
    try {
      const res = await fetch(postDataUrl, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.fname} ${form.lname}`,
          city: form.city,
          product: form.product,
          mobile_no: form.mobileNo,
          email: form.email,
        }),
      });
      const data = await res.json();
      if (data.error) {
        console.log(error);
      } else if (data.response) {
        otpPost();

        // console.log(data);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  // make a random 4 digit otp
  let otpDigit = Math.floor(1000 + Math.random() * 9000);

  async function otpPost() {
    try {
      const res = await fetch(otpPostUrl, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp_digit: otpDigit,
          mobile_no: form.mobileNo,
        }),
      });
      const data = await res.json();
      if (data.error) {
        console.log(error);
      } else if (data.response) {
        // console.log(data.response);
        router.push(
          `/otp/fullName=${form.fname} ${form.lname}&phoneNumber=${form.mobileNo}&product=${form.product}`
        );
        gupshup();
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function gupshup() {
    const raw = await fetch(
      `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=91${form.mobileNo}&msg=${otpDigit}%20is%20the%20OTP%20for%20your%20mobile%20number%20verification%20on%20ApnaPaisa.&msg_type=TEXT&userid=2000020122&auth_scheme=plain&password=!Apna%40Gupshup0506%23&v=1.1&format=text`,
      { mode: "no-cors" }
    );
    const data = await raw;
    // console.log({ data });
  }

  const formHandler = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className="form-container border border-primary rounded px-4 py-3">
      <form onSubmit={(e) => formHandler(e)}>
        <h2 className="display-6 mb-3">Enquire Now</h2>

        <div className="row">
          <div className="mb-3 col">
            <label htmlFor="fname" className="form-label">
              First name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control text-capitalize"
              id="fname"
              name="fname"
              aria-describedby="fname"
              placeholder="First name"
              value={form.fname}
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="lname" className="form-label">
              Last name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control text-capitalize"
              id="lname"
              name="lname"
              placeholder="Last name"
              aria-describedby="lname"
              value={form.lname}
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control text-capitalize"
            id="city"
            name="city"
            placeholder="Enter City of Residence"
            aria-describedby="city"
            value={form.city}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loanType" className="form-label">
            Product<span className="text-danger">*</span>
          </label>

          <select
            required
            id="product"
            name="product"
            className="form-select"
            aria-label="Default select example"
            value={form.product}
            onChange={(e) => changeHandler(e)}
          >
            <option></option>
            <option value="Term Insurance">Term Insurance</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="ULIP">ULIP</option>
            <option value="Guaranteed Income Plan">
              Guaranteed Income Plan
            </option>
            <option value="Personal Accident">Personal Accident</option>
            <option value="Motor Insurance">Motor Insurance</option>
            <option value="Home and Property Insurance">
              Home & Property Insurance
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">
            Mobile No<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            minLength={9}
            maxLength={10}
            placeholder="Enter Mobile no"
            id="mobileNo"
            name="mobileNo"
            aria-describedby="mobileNo"
            value={form.mobileNo}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            aria-describedby="email"
            value={form.email}
            onChange={(e) => changeHandler(e)}
            required
          />
        </div>
        <div className="mb-3">
          <p>
            By submitting, I agree to{" "}
            <span className="text-primary">Privacy Policy</span> &{" "}
            <span className="text-primary">Terms of use</span>
          </p>
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
