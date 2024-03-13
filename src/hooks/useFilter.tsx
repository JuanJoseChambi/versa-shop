import { useEffect, useState } from "react";
import { CategoryData, ColorData, SizeData, TypeData, UseFilterResponse } from "../interfaces/interfaces";
import { fetchGET } from "../utils/fetchGET";

export function useFilter (): UseFilterResponse{
    const [categories, setCategories] = useState<CategoryData[]>()
    const [types, setTypes] = useState<TypeData[]>()
    const [colors, setColors] = useState<ColorData[]>()
    const [sizes, setSizes] = useState<SizeData[]>()

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchGet() {
        try {
            const { data:categories } = await fetchGET("http://localhost:3001/category/all")
            const { data:types } = await fetchGET("http://localhost:3001/type/all")
            const { data:colors } = await fetchGET("http://localhost:3001/color/all")
            const { data:sizes } = await fetchGET("http://localhost:3001/size/all")
            setCategories(categories as CategoryData[])
            setTypes(types as TypeData[])
            setColors(colors as ColorData[])
            setSizes(sizes as SizeData[])
        } catch (error) {
            console.log(error);
            setError(error as string);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGet()
    },[])
    
return { categories, types, colors, sizes, error, loading }
}