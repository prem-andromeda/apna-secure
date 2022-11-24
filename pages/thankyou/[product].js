import { useRouter } from "next/router";
import React from "react";

const thankyou = () => {
  const router = useRouter();
  const { product } = router.query;

  return (
    <div className="container-box">
      <div className="thankyou-container">
        <div className="greeting-box">
          <img className="done" src="/tick.gif" alt="" />
          <h1 className="display-4 fw-bold text-center thankyou-text">
            You have successfully applied for {product && product}.
          </h1>
        </div>
        <p className="display-6 fw-bold text-center thankyou-text">
          Our representative will get in touch with you shortly
        </p>
      </div>
    </div>
  );
};

export default thankyou;
