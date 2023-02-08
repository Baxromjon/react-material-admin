export const api={


    //USER
    getAllUser:'/user/get_all_user',


    //PRODUCTS
    getAllProducts:'/product/getAllProduct',
    addProduct: '/product/add',
    editProduct:'/product/edit/',
    deleteProduct: '/product/delete_product/',
    getProductById: '/product/getById/',
    //ATTACHMENTS
    getById:'/photo/get/',

    //MEASUREMENTS

    getAllMeasurements:'/measurement/get_all_measurement',
    addMeasurement:'/measurement/add_measurement',
    deleteMeasurement: '/measurement/delete/',
    editMeasurement: '/measurement/edit/',

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
    addDetail: '/detail/add',
    editDetail: '/detail/edit/',
    deleteDetail: '/detail/delete_detail/',

    //VALUES
    getAllValueByDetailId:'/value/get_all_by_id/',
    addValue: '/value/add',
    editValue: '/value/edit/',
    deleteValue: '/value/delete/',

    //ATTACHMENT
    addFile: '/photo/multi-upload',
    addOneFile: '/photo/add_photo',


    //MONTH
    getAllMonth: '/month/get_all_month',
    deleteMonth: '/month/delete_month/',
    addMonth: '/month/add',
    editMonth:'/month/edit/',




    saveMonthlyPrice:'/monthly_price/add',
    editMonthlyPrice:'/monthly_price/edit',
    getProductByMonthly:'/monthly_price/get_all_product_by_monthly_price/',


}