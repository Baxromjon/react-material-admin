export const api={


    //USER
    getAllUser:'/user/get_all_user',


    //PRODUCTS
    getAllProducts:'/product/getAllProduct',
    addProduct: '/product/add',
    editProduct:'/product/edit/',

    //ATTACHMENTS
    getById:'/photo/get/',

    //MEASUREMENTS

    getAllMeasurements:'/measurement/get_all_measurement',

    //CATEGORIES
    getAllCategories:'/category/get_all_category',
    addCategory: '/category/add_category',
    deleteCategory:'/category/delete_category/',

    //BRANDS
    getAllBrands:'/brands/getAll',
    addBrand: '/brands/add_brand',
    editBrand: '/brands/edit_brand/',
    deleteBrand:'/brands/delete_brand/',

    //DETAILS
    getDetails: '/detail/get_all_details',

    //ATTACHMENT
    addFile: '/photo/multi-upload',
    addOneFile: '/photo/add_photo',


    //MONTH
    getAllMonth: '/month/get_all_month',
    saveMonthlyPrice:'/monthly_price/add',
    editMonthlyPrice:'/monthly_price/edit',
    getProductByMonthly:'/monthly_price/get_all_product_by_monthly_price/',


}