// import { CategoryData, ColorData, SizeData, TypeData, UseFilterResponse } from "../interfaces/interfaces";
// import { fetchGET } from "../utils/fetchGET";

// export async function allFilters (): Promise<UseFilterResponse> {

//         const { data:categories } = await fetchGET<CategoryData[]>("http://localhost:3001/category/all")
//         const { data:types } = await fetchGET<TypeData[]>("http://localhost:3001/type/all")
//         const { data:colors } = await fetchGET<ColorData[]>("http://localhost:3001/color/all")
//         const { data:sizes } = await fetchGET<SizeData[]>("http://localhost:3001/size/all")
 
//         const filteredCategories = categories || [];
//         const filteredTypes = types || [];
//         const filteredColors = colors || [];
//         const filteredSizes = sizes || [];
    
//         return { categories: filteredCategories, types: filteredTypes, colors: filteredColors, sizes: filteredSizes };
//     }