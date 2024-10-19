import React, {useEffect, useState} from "react";
import VerifyAuctionSheetModal from "../VerifyAuctionSheetModal";
import images from "../../assets/images";

const auctionSheetDetails = {
  image: images.car1,
  sheetNo: 12345,
  carName: "Range Rover Hybrid 2022"
}

const ModalDecider = ({ chassisNum, modalDetails, setModalDetails }) => {

  const [ chassisNumber, setChassisNumber ] = useState(chassisNum)
  const [ fullName, setFullName ] = useState("")
  const [ phoneNumber, setPhoneNumber ] = useState("")
  const [ emailAddress, setEmailAddress ] = useState("")
  const [ cardNumber, setCardNumber ] = useState("")
  const [ cardHolderName, setCardHolderName ] = useState("")
  const [ expiryDate, setExpiryDate ] = useState("")
  const [ cvv, setCvv ] = useState("")

  useEffect(() => {
    setChassisNumber(chassisNum)
  }, [chassisNum])

  const closeModal = () => {
    setModalDetails({ ...modalDetails, isOpen: false})
  }

  if (!modalDetails.isOpen) {
    return null;
  }

  else {
    if (modalDetails.type === "Enter Details") {
      return (
        <VerifyAuctionSheetModal 
          heading="Auction Sheet Verification"
          status="Enter Details"
          description="Get the original Auction Sheet Verified by Al Shams on your email & whatsapp by filling out this form"
          inputFields={[
            {
              name: "chassisNumber",
              placeholder: "Enter Chassis Number (eg: ZZT240-316982)",
              type: "text",
              value: chassisNumber,
              setValue: (value) => setChassisNumber(value)
            },
            {
              name: "fullName",
              placeholder: "Full name",
              type: "text",
              value: fullName,
              setValue: (value) => setFullName(value)
            },
            {
              name: "phoneNumber", 
              placeholder: "Phone number",
              type: "number",
              value: phoneNumber,
              setValue: (value) => setPhoneNumber(value)
            },
            {
              name: "emailAddress",
              placeholder: "Email address",
              type: "email",
              value: emailAddress,
              setValue: (value) => setEmailAddress(value)
            },
          ]}
          btnText="Verify Auction Sheet"
          onSubmitFunction={() => {
          }}
          closeModal={closeModal}
          next={() => setModalDetails({ ...modalDetails, type: "Make Payment"})}
          details={null}
        />
      )
    } 
    else if (modalDetails.type === "Make Payment") {
      return ( 
        <VerifyAuctionSheetModal 
          heading="Auction Sheet Verification"
          status="Make Payment"
          description="Kindly process the payment to get your auction sheet verified from Al Shams"
          inputFields={[
            {
              name: "cardNumber",
              placeholder: "Card Number   1234 5678 9012 3456",
              type: "number",
              value: cardNumber,
              setValue: (value) => setCardNumber(value)
            },
            {
              name: "cardHolderName",
              placeholder: "Cardholder Name",
              type: "text",
              value: cardHolderName,
              setValue: (value) => setCardHolderName(value)              
            },
            {
              name: "expiryDate",
              placeholder: "Expiry Date",
              type: "date",
              value: expiryDate,
              setValue: (value) => setExpiryDate(value)
            },
            {
              name: "cvv",
              placeholder: "CVV",
              type: "number",
              value: cvv,
              setValue: (value) => setCvv(value)
            },
          ]}
          btnText="Make Payment"
          onSubmitFunction={() => {
          }}
          closeModal={closeModal}
          next={() => setModalDetails({ ...modalDetails, type: "Download File"})}
          details={null}
        />
      )
    }
    else if (modalDetails.type === "Download File") {
      return (
        <VerifyAuctionSheetModal 
          heading="Congratulations!"
          status={null}
          description="Your payment is successful. Your auction sheet has been sent to your email & you can download by clicking “Download File” now"
          inputFields={null}
          btnText="Download File"
          onSubmitFunction={null}
          closeModal={closeModal}
          next={() => {
            setModalDetails({ isOpen: false, type: "Enter Details"})
            setChassisNumber("")
            setFullName("")
            setPhoneNumber("")
            setEmailAddress("")
            setCardNumber("")
            setCardHolderName("")
            setExpiryDate("")
            setCvv("")
          }}
          details={auctionSheetDetails}
        />
      )
    }

    else {
      return null;
    }
  }
  
};

export default ModalDecider;