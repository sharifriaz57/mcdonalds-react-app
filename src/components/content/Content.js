import { useSelector, useDispatch } from 'react-redux';
import './Content.css';
import './Product.css';
import Skeleton from './Skeleton';
import Product from './Product';
import { useState, useEffect, memo } from 'react';
import { productActions } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { useRef } from 'react';

const Content = ({ productLoading, toggleProductLoading }) => {
    const {currentMenu, products }= useSelector(state => state);
    const appContent = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [productSortValue, setProductSortValue] = useState("name");
    const dispatch = useDispatch();
    const { getCategoryProductActionCreator } = bindActionCreators(productActions, dispatch);

    useEffect(() => {
        if (localStorage.getItem('productSortOption') !== null) {
            const currentSortOption = localStorage.getItem('productSortOption');
            setProductSortValue(currentSortOption);
        }
    }, [productSortValue])
        
    const setProductLoading = () => {
        if (products) {
            toggleProductLoading(false);
        }
    }

    useEffect(() => {
        setProductLoading();
    }, [products])

    
    const addShadowOnScroll = (e) => {
        setIsScrolled(e.target.scrollTop > 0);
    }
    
    const handleProdcutSort = (e) => {
        setProductSortValue(e.target.value);
        localStorage.setItem('productSortOption', e.target.value);
        getCategoryProductActionCreator(products);
    }

    return (
        <div className={`w-full`}>
            <div className='app-content-header flex justify-between items-center sm:mb-6 mb-3'>
                <div>
                    <div className={`animate-pulse h-2 my-4 w-8 bg-lightYellow rounded ${productLoading ? '' : 'hidden'}`}></div>
                    <span className={`text-lg whitespace-nowrap ${productLoading ? 'hidden' : ''}`}><span className='font-semibold'>{`${products ? products.length : '0'}`}</span> Items</span>
                </div>
                <div className='flex-initial justify-center mx-2 leading-none'>
                    <div className={`animate-pulse h-2 my-4 w-20 bg-lightYellow rounded ${productLoading ? '' : 'hidden'}`}></div>
                    <div className={`${productLoading ? 'hidden' : ''} menu-title md:text-4xl text-3xl text-center font-bold leading-none`}>{currentMenu && currentMenu.name ? currentMenu.name : 'Full Menu'}</div>
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
                <Skeleton count={3} type={'product'} loading={productLoading} />
            </div>

            <div id='products' ref={appContent} className={`sm:pr-4 pr-3 ${productLoading ? 'hidden' : ''} ${isScrolled ? 'shadow-bottom' : ''}`} onScroll={addShadowOnScroll}>
                {products && products.length > 0 && products.map((product, key) =>
                    (product.name && product.name !== '') || product.price
                        ? <Product key={key} product={product} />
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

export default memo(Content);