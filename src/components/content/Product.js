import { useEffect } from "react";
import { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Product = ({ product, cartLoading, addToCart, addToCartInput, removeFromCart }) => {
    const cart = useSelector(state => state.cart);
    const cartInput = useRef();

    useEffect(() => {
        if (cartInput.current) {
            setValueOnLoad();
        }
    }, [])

    const setValueOnLoad = () => {
        cart.uniqueItemsId.length > 0 && cart.uniqueItemsId.forEach(id => {
            const qty = itemQuantity(id);
            if (cartInput.current.id === `inputQty${id}`) {
                cartInput.current.value = qty === 0 ? 1 : qty;
            }
        });
    }

    const itemQuantity = (id) => {
        let qty = 0;
        cart.itemsInfo.length > 0 && cart.itemsInfo.forEach(item => item.id === id ? qty = item.qty : 0);
        return qty;
    }

    const setInputValue = (id) => {
        const qty = itemQuantity(id);
        cartInput.current.value = qty === 0 ? 1 : qty;
        setTimeout(() => {
            cartInput.current.focus();
        }, 0)
    }

    const addFunc = async (id) => {
        await addToCart(id);
        setInputValue(id);
    }

    const removeFunc = async (id) => {
        await removeFromCart(id)
        setInputValue(id);
    }

    const addInputFunc = async (id, inputValue) => {
        await addToCartInput(id, inputValue)
        setInputValue(id);
    }

    return (
        <div key={product.id} className='main_product flex p-4 bg-white border mb-4 rounded-lg shadow-md'>
            <div className='product-img-container inline-flex items-center sm:mr-8 mr-3' style={{ width: '13rem' }}>
                <img src={product.image ? product.image : ''} alt="" className='' />
            </div>

            <div className='product_info w-full'>
                <div className='flex justify-between mb-1'>
                    <h4 className='product_name text-lg font-medium'>{product.name ? product.name : ''}</h4>
                    <span className='sm:inline-block hidden ml-4 whitespace-nowrap'>{product.calories ? `${Math.floor(product.calories)} kCal` : ''}</span>
                    <span className='inline-block sm:hidden ml-2 text-lg whitespace-nowrap font-extrabold'>{product.price ? `${product.price} AED` : ''}</span>
                </div>

                <div className='product_desc sm:mb-4 mb-2' style={{ minHeight: '2.75rem' }}>
                    <p className='leading-snug text-slate-500 text-md'>{product.description ? product.description : ''}</p>
                </div>

                <div className='flex justify-between'>
                    <div className='flex items-center'>

                        {cart.uniqueItemsId.indexOf(product.id) === -1
                            ? <button type="button" onClick={() => addFunc(product.id)}
                                className={`product-btn relative flex items-center px-5 py-1 rounded-md text-md capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                disabled={cartLoading.loading}
                            >
                                Add to Cart
                            </button>
                            : <div className='flex items-center'>
                                <button onClick={() => removeFunc(product.id)}
                                    className={`product-btn px-4 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                    disabled={cartLoading.loading}
                                >
                                    <FiMinus />
                                </button>

                                <div className='mx-2'>
                                    <input type="number" ref={cartInput} id={`inputQty${product.id}`} className="appearance-none inline-block text-center w-16 h-8 px-2 py-1 text-lg font-bold bg-slate-200 text-gray-600 border border-gray-300 rounded-md leading-tight 
                                       focus:text-gray-700 focus:border-lightYellow focus:outline-none focus:bg-white focus:ring-0"
                                        disabled={cartLoading.loading}
                                        onChange={(e) => addInputFunc(product.id, e.target.value)}
                                    />
                                </div>

                                <button onClick={() => addFunc(product.id)}
                                    className={`product-btn px-4 rounded-md h-8 capitalize transition ease-out duration-300 bg-lightYellow hover:bg-yellow-400 ${cartLoading.loading ? 'cursor-not-allowed' : ''}`}
                                    disabled={cartLoading.loading}
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        }

                        <img src="/images/loader2.gif" className={`h-8 w-8 sm:ml-3 ml-1 ${cartLoading.id && cartLoading.id === product.id ? '' : 'hidden'}`} alt="" />
                    </div>

                    <span className='sm:inline-block hidden text-xl font-extrabold'>{product.price ? `${product.price} AED` : ''}</span>
                </div>
            </div>
        </div>
    )
}

export default Product;