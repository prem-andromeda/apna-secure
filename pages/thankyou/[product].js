import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo } from "react";

const Thankyou = () => {
  const router = useRouter();
  const { product } = router.query;

  return (
    <div className="container-box">
      <div className="thankyou-container">
        <div className="greeting-box">
          <Image
            height={300}
            width={300}
            className="done"
            src="/tick.gif"
            alt=""
          />
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

export default memo(Thankyou);
