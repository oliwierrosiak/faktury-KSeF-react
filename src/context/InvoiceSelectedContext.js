import React from "react";

const InvoiceSelectedContext = React.createContext({
    invoiceSelected:[],
    setInvoiceSelected:()=>{}
})

export default InvoiceSelectedContext