import SkeletonDemo from "@/components/common/skeleton"
import ProductsPage from "@/components/pages/products"
import { getProducts } from "@/server/query/product"
import { Suspense } from "react"

export default async function Page() {
    const products = await getProducts()

    return (
        <Suspense fallback={<SkeletonDemo className="w-11/12 mx-auto"/>}>
            <ProductsPage products={products} />
        </Suspense>
    )
}