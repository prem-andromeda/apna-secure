import React from "react";

const InsuranceAdverise = () => {
  return (
    <div className="ads-container d-flex flex-column justify-content-center align-items-center">
      <div className="">
        <h1 className="display-1 fw-semibold primary">
          Insure your future with us
        </h1>
        <p className="text-secondary">
          Simplify the way you buy insurance and find the policy that’s right
          for you.
        </p>
      </div>
      <div className="">
        <img className="ads-img" src="insurance.png" alt="" />
      </div>
    </div>
  );
};

export default InsuranceAdverise;
