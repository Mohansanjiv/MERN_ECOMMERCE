const catchAsyncError = require('../middleware/catchAsyncError')
const Product = require('../models/productSchema')
const ApiFeatures = require('../utils/apiFeatures')
const ErrorHandler = require('../utils/errorHandler')

//create product -- Admin

exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product
  })
})

//Get All Products

exports.getAllProducts = catchAsyncError( async(req, res) => {
    const resultPerPage ="5";

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage)
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products
  })
})

// get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('product not  found', 404))
  }
  res.status(200).json({
    success: true,
    product
  })
})

// update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product Not Found'
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    product
  })
})

// delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product Not Found'
    })
  }
  await Product.deleteOne({ _id: req.params.id }) // Use deleteOne method
  res.status(200).json({
    success: true,
    message: 'product Deleted successfully'
  })
})
