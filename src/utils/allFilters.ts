import useApi from "../hooks/useApi";
import { ArraysWithFilters, Filters } from "../interfaces/components";



export function allFilters (): ArraysWithFilters {

    const {data} = useApi("http://localhost:3001/product/filters") as {data:Filters}
    
    const categories = data?.categories?.map(categorie => categorie?.category)
    const types = data?.types?.map(type => type?.type)
    const sizes = data?.sizes?.map(size => size?.size)
    const colors = data?.colors;

    return { categories, types, sizes, colors };
}