import { AiOutlinePlus } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const CartProduct = ({ item, cartLoading, addToCart, removeFromCart, deleteFromCart }) => {

    return (
        <div key={item.id} className='flex py-2 px-4 bg-white border mb-3 rounded-md shadow-md'>
            <div className='inline-flex items-center mr-4' style={{ width: '9rem' }}>
                <img src={item.details.image ? item.details.image : ''} alt="" className='' />
            </div>

            <div className='product_info w-full'>
                <div className='flex justify-between mb-1'>
                    <h4 className='text-lg font-normal leading-tight'>{item.details.name ? item.details.name : ''}</h4>
                    <span className="ml-4 whitespace-nowrap">{item.details.calories ? `${Number(item.details.calories)} kCal` : ''}</span>
                </div>

                <div className='mb-3 leading-tight'>
                    <span className='text-md font-black text-black'>{item.details.price ? `${item.details.price}` : '0'} <span className="text-semibold">AED</span></span>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <button onClick={() => removeFromCart(item.id)}
                                className={`product-btn px-2 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                disabled={cartLoading.loading}
                            >
                                <FiMinus />
                            </button>

                            <div className='mx-2 text-lg font-semibold'>
                                {item.qty}
                            </div>

                            <button onClick={() => addToCart(item.id)}
                                className={`product-btn px-2 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                disabled={cartLoading.loading}
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>

                        <img src="/images/loader2.gif" className={`h-8 w-8 ml-3 ${cartLoading.id && cartLoading.id === item.id ? '' : 'hidden'}`} alt="" />
                    </div>

                    <button onClick={() => deleteFromCart(item.id)}
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