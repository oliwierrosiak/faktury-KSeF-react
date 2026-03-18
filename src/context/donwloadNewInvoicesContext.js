import React from "react";

const DownloadNeInvoicesContext = React.createContext({
    newInvoices:false,
    setNewInvoices:()=>{}
})

export default DownloadNeInvoicesContext