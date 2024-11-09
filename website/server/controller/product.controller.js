import Product from '../model/product.model.js'

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({}).limit(20);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductById = async(request, response) => {
    try {
        const {id} = request.params;
        const product = await Product.findOne({ product_id: id })

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}