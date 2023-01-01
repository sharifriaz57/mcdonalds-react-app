import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import Modal from './components/content/Modal';

function App() {
	const [quickSearch, setQuickSearch] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [productLoading, setProductLoading] = useState(true);

	const handleKeyPress = useCallback((event) => {
		if (event.ctrlKey && event.keyCode === 81) {
			setQuickSearch(prev => prev + 1);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	const openModal = () => {
		setIsOpen(true);
	}

	const closeModal = () => {
		setIsOpen(false);
	}
  
	const toggleProductLoading = (type) => setProductLoading(type)

	return (
		<div id="app-main" className='max-w-screen-lg md:px-12 sm:px-4 px-2 mx-auto bg-white'>
			<Header openModal={openModal} />

			<div id="app-content" className='flex'>
				<Sidebar focusOnSearch={quickSearch} toggleProductLoading={toggleProductLoading} />
				
				<div id="app-product" className='pl-12 w-full'>
					<Content productLoading={productLoading} toggleProductLoading={toggleProductLoading} />
				</div>
			</div>

			<Modal isOpen={isOpen} closeModal={closeModal} />
		</div>
	);
}

export default App;
