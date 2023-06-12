import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // Below was used for uploading SHOP_DATA to firebase db 
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    //     console.log(SHOP_DATA)
    // }, [])

    useEffect(() => {
        // wrap async function (getCetegoriesAndDocuments) in different asycn function inside of use effect
        const getCategoriesMap = async () => {
            const cetegoryMap = await getCategoriesAndDocuments('categories');
            setCategoriesMap(cetegoryMap);
        };

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value ={value}> {children} </CategoriesContext.Provider>
    )
}
