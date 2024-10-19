import React, {useEffect, useState} from "react";
import BreadCrum from "../BreadCrum";
import ViewOnlyTable from "../ViewOnlyTable";

const bCrumbs = [
  {
    text: "Home",
    href: "/"
  },
  {
    text: "Profile",
    href: "/"
  },
  {
    text: "My Shipments",
    href: "/"
  },
]

const heading = "Shipments"
const header = {
  attributes: [
    { nameToShow: "Port From", key: "portFrom", flexGrow: 1 }, 
    { nameToShow: "Port To", key: "portTo", flexGrow: 1 }, 
    { nameToShow: "Destination", key: "destination", flexGrow: 1 }, 
    { nameToShow: "Units", key: "units", flexGrow: 0.6 }, 
    { nameToShow: "ETD", key: "etd", flexGrow: 0.8 }, 
    { nameToShow: "ETA", key: "eta", flexGrow: 0.8 },
    { nameToShow: "Booking Number", key: "bookingNumber", flexGrow: 1 },
    { nameToShow: "Vessel Name", key: "vesselName", flexGrow: 1.2 },
    { nameToShow: "Shipping Request Type", key: "shippingRequestType", flexGrow: 1.3 },
  ],
}
// body pattern
// const body = [
//   { attribute1: "value1"},
//   ...
// ]
const viewAction = {
  baseUrl: "/shipments",
  attribute: "id"
}

function Shipments() {

  const [breadcrumbs, setBreadcrumbs] = useState(bCrumbs);
  const [tableHeader, setTableHeader] = useState(header);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState(null);

  const setSortingFunc = (order, attribute) => {
    setSorting({
      order,
      attribute
    });
  }

  useEffect(() => {
    const dataCopy = [ ...data ];
    const sortedData = dataCopy.sort((a, b) => {
      const compareValue1= a[sorting.attribute];
      const compareValue2= b[sorting.attribute];

      if (sorting.order === "DESC") {
        if (typeof compareValue1 === "string" && typeof compareValue2 === "string") {
          return compareValue2.localeCompare(compareValue1);
        }
        if (typeof compareValue1 === "number" && typeof compareValue2 === "number") {
          return compareValue2 - compareValue1;
        }
      }
      
      else {
        if (typeof compareValue1 === "string" && typeof compareValue2 === "string") {
          return compareValue1.localeCompare(compareValue2);
        }
        if (typeof compareValue1 === "number" && typeof compareValue2 === "number") {
          return compareValue1 - compareValue2;
        }
      }
    });
    setData(sortedData);
  }, [sorting])

  useEffect(() => {
    setData([
      { id: "1212", portFrom: "NAGOYA", portTo: "KARACHI SAPT", destination: "KARACHI SAPT", units: 2, etd: "11-Oct-2024", eta: "10-Nov-2024", bookingNumber: "150VBK4001842", vesselName: "MCC SHENZHEN", shippingRequestType: "Container" },
      { id: "3244", portFrom: "YOKOHAMA", portTo: "LIVERPOL", destination: "JEBEL ALI", units: 6, etd: "1-Feb-2024", eta: "10-Nov-2024", bookingNumber: "45rGVESVR1842", vesselName: "TS SHENZHEN", shippingRequestType: "RORO" },
      { id: "5432", portFrom: "NAGOYA", portTo: "KARACHI SAPT", destination: "KARACHI SAPT", units: 12, etd: "10-Oct-2022", eta: "10-Jan-2022", bookingNumber: "1trewVBK4001842", vesselName: "ACX PEARL", shippingRequestType: "Container" },
      { id: "3434", portFrom: "KOBE", portTo: "LIVERPOOL", destination: "KARACHI SAPT", units: 5, etd: "11-Oct-2022", eta: "20-Jan-2024", bookingNumber: "150V45BK4001842", vesselName: "POSITIVE CHALLENGER", shippingRequestType: "RORO" },
      { id: "4342", portFrom: "NAGOYA", portTo: "KARACHI SAPT", destination: "KARACHI SAPT", units: 1, etd: "20-Oct-2022", eta: "10-Jan-2023", bookingNumber: "654BK4001842", vesselName: "IRENES RALLY", shippingRequestType: "Container" },
      { id: "7687", portFrom: "YOKOHAMA", portTo: "KARACHI SAPT", destination: "KARACHI-KICT", units: 9, etd: "10-Mar-2024", eta: "10-Sep-2024", bookingNumber: "000K4001842", vesselName: "JOSEPHINE MAERSK", shippingRequestType: "Container" },
    ])
    setSortingFunc("ASC", tableHeader.attributes[0].key);
  }, []);
  
  return (
    <div className="shipments-container">
       <BreadCrum items={breadcrumbs} />
       <ViewOnlyTable 
        heading={heading}
        header={header}
        body={data}
        viewAction={viewAction}
        setSortingFunc={setSortingFunc}
       />
    </div>
  );
}

export default Shipments;

