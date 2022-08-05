import React, { useEffect, useRef, useState } from 'react';
import { getCategoryByCategoryId, getMenus, getProductsByCategoryId, SearchMenuProductsByName } from '../../repository/Repository';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { BsSearch } from "react-icons/bs";
import { bindActionCreators } from 'redux';
import { menuAction, productActions } from '../../redux/actions/actions';
import Skeleton from '../content/Skeleton';

const Sidebar = ({ focusOnSearch, handleSkeleton }) => {
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const quickSearch = useRef(null);
    const menus = useSelector(state => state.menus);
    const dispatch = useDispatch();
    const { getAllMenuActionCreator, getCurrentMenuActionCreator } = bindActionCreators(menuAction, dispatch);
    const { getCategoryProductActionCreator } = bindActionCreators(productActions, dispatch);
    

    useEffect(() => {
        getSidebarMenu();
        loadCategoryProducts();
    }, []);

    useEffect(() => {
        if (focusOnSearch > 0) {
            quickSearch.current.focus();
        }
    }, [focusOnSearch]);

    const getSidebarMenu = async () => {
        const response = await getMenus();
        if (response.status === 200) {
            getAllMenuActionCreator(response.data);
            setLoading(false);
        }
    }

    const loadCategoryProducts = async (e, id) => {
        handleSkeleton();
        setActiveMenu(id);
        const categoryDetails = await getCategoryByCategoryId(id);
        const products = await getProductsByCategoryId(id);

        if (categoryDetails.status === 200) {
            getCurrentMenuActionCreator(categoryDetails.data);
        }
        if (products.status === 200) {
            getCategoryProductActionCreator(products.data);
        }
    }

    const childFunc = (e) => {
        const parentClass = e.target.parentNode.className;
        return parentClass;
    }

    const handleSearch = (callback, duration) => {
        let timer;

        return function (e) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(e);
            }, duration)
        }
    }

    const searchByName = handleSearch(async (e) => {
        handleSkeleton();
        setLoading(true);
        const searchKey = e.target.value;
        const response = await SearchMenuProductsByName(searchKey)
        if (response.status === 200) {
            getCategoryProductActionCreator(response.data.products);
            getAllMenuActionCreator(response.data.menu);
            setLoading(false);
        }
    }, 400);

    const getSelectedItems = (e) => {
        loadCategoryProducts(e, e.target.value);
    }

    return (
        <div id='app-sidebar' className='block'>
            <div id='app-search' className='w-full flex justify-between'>
                <div className='w-64 rounded-md relative'>
                    <input type="text" placeholder='Quick search...         Ctrl+Q' onChange={searchByName} ref={quickSearch} id='quickSearch' className='w-full px-4 pl-10 py-1 font-semibold border border-gray-300  shadow-none rounded-md hover:bg-gray-50 focus:bg-gray-50 focus:border-lightYellow focus:caret-lightYellow focus:ring-1 focus:ring-yellow-300' />
                    <span className='flex items-center absolute top-0 left-0 px-3 h-full rounded-md'><BsSearch /></span>
                </div>
                <select name="category-select" id="app-category-select" className='hidden w-36 px-3 py-1 ml-2 border border-slate-300 rounded-md focus:border-lightYellow focus:caret-lightYellow focus:ring-1 focus:ring-yellow-300'
                    onChange={getSelectedItems}
                >
                    <option value={''}>Full Menu</option>
                    {menus.length > 0 && menus.map((menu, key) => {
                        return <option key={key} value={menu.id}>{menu.name}</option>
                    })}
                </select>
            </div>

            <div id='app-sidebar-category' className='sidebar w-64 mt-6 border-2 border-gray-300 rounded-lg'>
                <Skeleton count={5} type={'menu'} loading={loading} />

                {menus
                    ?
                    <div className={`${loading ? 'hidden' : ''}`}>
                        <div onClick={loadCategoryProducts} className={`sidebar_category w-full flex items-center leading-tight text-lg px-4 py-2 cursor-pointer ${activeMenu === undefined || activeMenu === null ? 'active' : ''}`}>
                            <img onClick={childFunc} src="/images/products/full-menu-uae-new.jpg" className='mr-4' alt="" />
                            <div onClick={childFunc} >Full Menu</div>
                        </div>
                        {menus.map((menu) =>
                            <div key={menu.id} onClick={(e) => loadCategoryProducts(e, menu.id)} 
                                className={`sidebar_category w-full flex items-center leading-tight text-lg px-4 py-2 cursor-pointer ${activeMenu === menu.id ? 'active' : ''}`}     
                            >
                                <img onClick={childFunc} src={menu.image ? menu.image : ''} className='category_img mr-4' alt="" />
                                <div onClick={childFunc} className='category_name'>{menu.name}</div>
                            </div>
                        )}
                    </div>
                    : ''
                }

            </div>
        </div>
    )
}

export default Sidebar;