const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter product Name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please Enter Your Product Description']
  },
  price: {
    type: String,
    required: [true, 'Please Enter your product price'],
    maxLenghth: [8, 'price cannot exceed 8 characters']
  },
  rating: {
    type: Number,
    default: 0
  },

  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'please enter product category']
  },
  stock: {
    type: String,
    required: [true, 'please enter product stock'],
    maxLenghth: [4, 'stock cannot exceed 4 characters'],
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: Number,
        required: true
      }
    }
  ],
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)
