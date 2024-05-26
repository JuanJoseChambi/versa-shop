import { useEffect, useState } from "react";
import { CategoryData, ColorData, SizeData, TypeData, UseFilterResponse } from "../interfaces/interfaces";
import { fetchGET } from "../utils/fetchGET";
const {VITE_URL_BASE} = import.meta.env

export function useFilter (): UseFilterResponse{
    const [categories, setCategories] = useState<CategoryData[]>()
    const [types, setTypes] = useState<TypeData[]>()
    const [colors, setColors] = useState<ColorData[]>()
    const [sizes, setSizes] = useState<SizeData[]>()

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchGet() {
        try {
            const { data:categories } = await fetchGET(`${VITE_URL_BASE}/category/all`)
            const { data:types } = await fetchGET(`${VITE_URL_BASE}/type/all`)
            const { data:colors } = await fetchGET(`${VITE_URL_BASE}/color/all`)
            const { data:sizes } = await fetchGET(`${VITE_URL_BASE}/size/all`)
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