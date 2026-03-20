import React from "react";

const DownloadLoadingContext = React.createContext({
    downloadLoading:false,
    setDownloadLoading:()=>{}
})

export default DownloadLoadingContext