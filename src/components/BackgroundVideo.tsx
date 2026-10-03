import React from 'react';

export const BackgroundVideo: React.FC = () => {
  return (
    <>
      {/* 100% Clear, Unobstructed Video Background z-[0] */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-[0] pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
      />
    </>
  );
};
