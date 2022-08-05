import { useSelector, useDispatch } from 'react-redux';
import './Content.css';
import './Product.css';
import Skeleton from './Skeleton';
import Product from './Product';
import { useState, useEffect } from 'react';
import { productActions } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';

const Content = ({ products, loading, cartLoading, addToCart, addToCartInput, removeFromCart, handleSkeleton, stopLoadingSkeleton, getOccurrence }) => {
    const currentMenu = useSelector(state => state.currentMenu);
    const [productSortValue, setProductSortValue] = useState("name");
    const dispatch = useDispatch();
    const { getCategoryProductActionCreator } = bindActionCreators(productActions, dispatch);

    useEffect(() => {
        if (localStorage.getItem('productSortOption') !== null) {
            const currentSortOption = localStorage.getItem('productSortOption');
            setProductSortValue(currentSortOption);
        }
    }, [productSortValue])
    
    const handleProdcutSort = (e) => {
        handleSkeleton();
        setProductSortValue(e.target.value);
        localStorage.setItem('productSortOption', e.target.value);
        getCategoryProductActionCreator(products);
        stopLoadingSkeleton();
    }

    return (
        <div className={`w-full`}>
            <div className='app-content-header flex justify-between items-center sm:mb-6 mb-3'>
                <div>
                    <div className={`animate-pulse h-2 my-4 w-8 bg-lightYellow rounded ${loading ? '' : 'hidden'}`}></div>
                    <span className={`text-lg whitespace-nowrap ${loading ? 'hidden' : ''}`}><span className='font-semibold'>{`${products ? products.length : '0'}`}</span> Items</span>
                </div>
                <div className='flex-initial justify-center mx-2 leading-none'>
                    <div className={`animate-pulse h-2 my-4 w-20 bg-lightYellow rounded ${loading ? '' : 'hidden'}`}></div>
                    <div className={`${loading ? 'hidden' : ''} menu-title md:text-4xl text-3xl text-center font-bold leading-none`}>{currentMenu && currentMenu.name ? currentMenu.name : 'Full Menu'}</div>
                </div>
                <div>
                    <select className='w-36 px-3 py-1 flex border border-slate-300 rounded-md focus:border-lightYellow focus:caret-lightYellow focus:ring-1 focus:ring-yellow-300'
                        value={productSortValue} onChange={handleProdcutSort}
                    >
                        <option value="name" className='font-semibold'>Name</option>
                        <option value="priceLowest" className='font-semibold'>Price (Lowest)</option>
                        <option value="priceHighest" className='font-semibold'>Price (Highest)</option>
                    </select>
                </div>
            </div>

            <div className='pr-4' style={{ maxHeight: 'calc(100vh - 170px)', overflow: 'hidden auto' }}>
                <Skeleton count={3} type={'product'} loading={loading} />
            </div>

            <div id='products' className={`sm:pr-4 pr-3 ${loading ? 'hidden' : ''}`}>
                {products && products.length > 0 && products.map((product, key) =>
                    (product.name && product.name !== '') || product.price
                        ? <Product key={key} product={product} cartLoading={cartLoading}
                            addToCart={addToCart} addToCartInput={addToCartInput} removeFromCart={removeFromCart} getOccurrence={getOccurrence} />
                        : ''
                    )
                }

                {products && products.length === 0
                    ? <div className='h-full w-full flex flex-col items-center justify-center'>
                        <img src="/images/products/no-item.jpg" style={{ maxWidth: '18rem' }} alt="" />
                        <h4 className='text-center text-2xl'>No Items Avaiable!</h4>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default Content;