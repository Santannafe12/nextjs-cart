import Products from "@/components/products"
import { getProducts } from "@/server/query/product"

export default async function Page() {
    const products = await getProducts()

    return (
        <Products products={products} />
    )
}