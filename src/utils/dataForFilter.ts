import { DataProduct } from "../interfaces/interfaces";

export function dataForFilter (data: DataProduct[]){
    let categories =  new Set(data?.map(product => product.Category.category))
    let types = new Set(data?.map(product => product.Type.type));

    let sizes = new Set(); 
    let colorshxa = new Set<string>();
    data?.forEach((product) => {
        product.Stocks.forEach((stock) => {
            sizes.add(stock.Size.size)
            let colorshxaItem = { color: stock.Color.color, hxacolor: stock.Color.hxacolor };
            let colorshxaString = JSON.stringify(colorshxaItem);
            if (!colorshxa.has(colorshxaString)) {
                colorshxa.add(colorshxaString ) ;
            }
            
        })
    })

    const colorsArray = Array.from(colorshxa).map(color => { return JSON.parse(color) as { color:string, hxacolor:string } });
    const categoriesArray = [...categories] as string[];
    const typesArray = [...types] as string[];
    const sizesArray = [...sizes] as string[];
    return { colorsArray, categoriesArray, typesArray, sizesArray }
}

//  ANTES ------------------------------------------------------------------------------------------------ 
   // let categories =  new Set(data?.map(product => product.Category.category))
    // let types = new Set(data?.map(product => product.Type.type));

    // let sizes = new Set(); 
    // let colorshxa = new Set<string>();
    // data?.forEach((product) => {
    //     product.Stocks.forEach((stock) => {
    //         sizes.add(stock.Size.size)
    //         let colorshxaItem = { color: stock.Color.color, hxacolor: stock.Color.hxacolor };
    //         let colorshxaString = JSON.stringify(colorshxaItem);
    //         if (!colorshxa.has(colorshxaString)) {
    //             colorshxa.add(colorshxaString ) ;
    //         }
            
    //     })
    // })

    // const colorsArray = Array.from(colorshxa).map(color => { return JSON.parse(color) as { color:string, hxacolor:string } });
    // const categoriesArray = [...categories] as string[];
    // const typesArray = [...types] as string[];
    // const sizesArray = [...sizes] as string[];