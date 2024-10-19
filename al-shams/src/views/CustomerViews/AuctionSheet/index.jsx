import React from "react";
import AuctionSheetVerification from "../../../components/AuctionSheetVerification"
import WhyChooseAlshamsAuction from "../../../components/WhyChoose/WhyChooseAlshamsAuction"
import AuctionSheetVerificationSteps from "../../../components/AuctionSheetVerificationSteps"
import VerifiedAuctionSheetCars from "../../../components/VerifiedAuctionSheetCars"
import AuctionSheetBanner from "../../../components/AuctionSheetBanner"
import { AnimatedPage } from "../../../components";

const AuctionSheet = () => {
  return (
    <AnimatedPage>
      <div>
        <AuctionSheetBanner />
        <AuctionSheetVerification />
        <WhyChooseAlshamsAuction />
        <AuctionSheetVerificationSteps />
        <VerifiedAuctionSheetCars />
      </div>
    </AnimatedPage>
  );
};

export default AuctionSheet;
