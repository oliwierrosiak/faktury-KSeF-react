import React from "react";

const SomeInvoiceSelectedContext = React.createContext({
    someInvoiceSelected:false,
    setSomeInvoiceSelected:()=>{}
})

export default SomeInvoiceSelectedContext