import { useParams } from "react-router-dom"

function ProductDetailPage(){
    const params = useParams();

    return (
        <>
            <h3> producct detail</h3>
            <p>{params.productId}</p>
        </>
    )

}

export default ProductDetailPage