// import { useApi } from "../../../hooks/useApi"
// import { ObjectUseApi } from "../../../interfaces/interfaces";

import useApi from "../../../hooks/useApi";
import { ResponseAllProducts } from "../../../interfaces/interfaces";

function MainHome() {
  
      const { data, error, loading}: ResponseAllProducts = useApi("https://product-api-backend-production.up.railway.app/api/v1/product/all");

  console.log(data);
  // console.log(loading);
  

  return (
    <main className="area flex justify-center items-center">
      <section>
        Hola
      </section>
    </main>
  )
}

export default MainHome