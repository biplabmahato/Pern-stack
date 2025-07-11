import {sql} from '../config/db.js';


export  const getProducts=async(req, res) => {
    try{
        const products=await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        
        `;
        console.log("fetched products",products);
        res.status(200).json({success:true, data:products});
    }
    catch(error){
        console.log("error in fetching products",error);
        res.status(500).json({success:false, message:"internal server error"});
    }
    


};


export const getProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await sql`
       SELECT * FROM products WHERE id=${id}
      `;
  
      res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
      console.log("Error in getProduct function", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };






export const createProduct =async(req, res) => {
    const {name, image, price}=req.body;


    if(!name || !image || !price){
        return res.status(400).json({success:false, message:"all fields are required"});
    }
    try{

        const newProduct=await sql`
        INSERT INTO products(name, image, price)
        VALUES(${name},${image},${price})  
        RETURNING * 
        `;
        console.log("new product added",newProduct);
        res.status(201).json({success:true, message:"new product{0}"}); 

    }
    catch(error){
        console.log("error in createProduct function",error);
        res.status(500).json({success:false, message:"internal server error"});


    }
};



export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
  
    try {
      const updateProduct = await sql`
        UPDATE products
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
      `;
  
      if (updateProduct.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.status(200).json({ success: true, data: updateProduct[0] });
    } catch (error) {
      console.log("Error in updateProduct function", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };







export const deleteProduct =async(req, res) => {
    const { id } = req.params;

    try {
      const deletedProduct = await sql`
        DELETE FROM products WHERE id=${id} RETURNING *
      `;
  
      if (deletedProduct.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.status(200).json({ success: true, data: deletedProduct[0] });
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };





export const getProductById =async(req, res) => {
    const {id}=req.params

    try{
        const product=await sql`
        SELECT * FROM products
        WHERE id=${id}
        `;
        console.log("fetched product",product);
        if(product.count===0){
            return res.status(404).json({success:false, message:"product not found"});
        }
        res.status(200).json({success:true, data:product[0]});
    }
    catch(error){

    }


};
