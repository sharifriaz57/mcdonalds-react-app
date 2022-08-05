import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './components/content/Modal';
import { bindActionCreators } from 'redux';
import * as actionCreators from './redux/actions/actions';

function App() {
	const [quickSearch, setQuickSearch] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const products = useSelector(state => state.products);
	const [loading, setLoading] = useState(true);
	const [cartLoading, setCartLoading] = useState({id: null, loading: false});
    const dispatch = useDispatch();
    const { addToCartAction, addToCartInputAction, removeFromCartAction, deleteFromCartAction } = bindActionCreators(actionCreators.cartActions, dispatch);

	useEffect(() => {
        if (products) {
            setLoading(false);
        }
    }, [products]);

	const handleKeyPress = useCallback((event) => {
		if (event.ctrlKey && event.keyCode === 81) {
			setQuickSearch((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	const handleSkeleton = () => {
		setLoading(true);
	}

	const stopLoadingSkeleton = () => {
		setLoading(false);
	}

	const openModal = () => {
		setIsOpen(true);
	}

	const closeModal = () => {
		setIsOpen(false);
	}

	const addToCart = async (id) => {
        setCartLoading({id: id, loading: true});
        await addToCartAction(id);
        setCartLoading({id: null, loading: false});
    }

	const addToCartInput = async (id, qty) => {
        setCartLoading({id: id, loading: true});
        await addToCartInputAction(id, qty);
        setCartLoading({id: null, loading: false});
    }

    const removeFromCart = async (id) => {
        setCartLoading({id: id, loading: true});
        await removeFromCartAction(id);
        setCartLoading({id: null, loading: false});
    }

	const deleteFromCart = async (id) => {
        setCartLoading({id: id, loading: true});
        await deleteFromCartAction(id);
        setCartLoading({id: null, loading: false});
    }

    const getOccurrence = (array, value) => {
        let count = 0;
        array.forEach((item) => (item === value && count++));
        return count;
    }

	return (
		<div id="app-main" className='max-w-screen-lg md:px-12 sm:px-4 px-2 mx-auto bg-white'>
			<Header openModal={openModal} />

			<div id="app-content" className='flex'>
				<Sidebar focusOnSearch={quickSearch} handleSkeleton={handleSkeleton} />
				
				<div id="app-product" className='pl-12 w-full'>
					<Content products={products} loading={loading} cartLoading={cartLoading} addToCart={addToCart} addToCartInput={addToCartInput} removeFromCart={removeFromCart}
						handleSkeleton={handleSkeleton} stopLoadingSkeleton={stopLoadingSkeleton} getOccurrence={getOccurrence}
					/>
				</div>
			</div>

			<Modal isOpen={isOpen} closeModal={closeModal} loading={loading} cartLoading={cartLoading} addToCart={addToCart} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart}
					getOccurrence={getOccurrence} />
		</div>
	);
}

export default App;
