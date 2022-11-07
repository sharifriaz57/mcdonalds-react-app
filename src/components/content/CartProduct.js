import { AiOutlinePlus } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import * as actionTypes from '../../redux/actions/actionTypes';
import useCartAction from "../../customHooks/cartActionHooks";

const CartProduct = ({ singleProduct }) => {
    const product = {
        ...singleProduct.details,
        qty: singleProduct.qty,
    };
    const { cartLoading, invokeCartAction } = useCartAction();

    return (
        <div key={product.id} className='flex py-2 px-4 bg-white border mb-3 rounded-md shadow-md'>
            <div className='inline-flex items-center mr-4' style={{ width: '9rem' }}>
                <img src={product.image ? product.image : ''} alt="" className='' />
            </div>

            <div className='product_info w-full'>
                <div className='flex justify-between mb-1'>
                    <h4 className='text-lg font-normal leading-tight'>{product.name ? product.name : ''}</h4>
                    <span className="ml-4 whitespace-nowrap">{product.calories ? `${Number(product.calories)} kCal` : ''}</span>
                </div>

                <div className='mb-3 leading-tight'>
                    <span className='text-md font-black text-black'>{product.price ? `${product.price}` : '0'} <span className="text-semibold">AED</span></span>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <button onClick={() => invokeCartAction(product, actionTypes.REMOVE_FROM_CART)}
                                className={`product-btn px-2 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                disabled={cartLoading.loading}
                            >
                                <FiMinus />
                            </button>

                            <div className='mx-2 text-lg font-semibold'>
                                {product.qty}
                            </div>

                            <button onClick={() => invokeCartAction(product, actionTypes.ADD_TO_CART)}
                                className={`product-btn px-2 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                disabled={cartLoading.loading}
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>

                        <img src="/images/loader2.gif" className={`h-8 w-8 ml-3 ${cartLoading.id && cartLoading.id === product.id ? '' : 'hidden'}`} alt="" />
                    </div>

                    <button onClick={() => invokeCartAction(product, actionTypes.DELETE_FROM_CART)}
                        className={`product-btn px-2 rounded-md h-8 capitalize transition ease-out duration-300 text-slate-700 border-2 border-lightYellow hover:bg-lightYellow hover:text-slate-900 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                        disabled={cartLoading.loading}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;