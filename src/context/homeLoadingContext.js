import React from "react";

const HomeLoadingContext = React.createContext({
    loading:true,
    setLoading:()=>{}
})

export default HomeLoadingContext