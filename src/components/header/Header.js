import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart3 } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { cartActions } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';

const Header = ({ openModal }) => {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const { clearCartAction } = bindActionCreators(cartActions, dispatch);

	return (
		<>
			<div className='flex justify-between items-center'>
				<img src="/images/McDonalds_Logo2.png" alt="" className='logo-img' style={{ maxWidth: '6rem' }} />

				<div className='flex space-x-2 flex-row-reverse items-center'>
					<span className='text-2xl relative cursor-pointer ease-in-out duration-300 p-3 rounded-full hover:bg-yellow-300' title='Cart'
						 onClick={openModal}>
						<BsCart3 />
						{cart.cartItems > 0
							? 
								<span className='absolute top-3 left-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full text-base font-bold border-2 border-yellow-600 text-black bg-lightYellow'>
									{cart.cartItems}
								</span>
							: ''
						}
					</span>
					<span className='text-2xl relative cursor-pointer ease-in-out duration-300 p-3 rounded-full hover:bg-yellow-300' title='Clear Cart'
						onClick={() => clearCartAction()}>
						<BiReset />
					</span>
				</div>
			</div>
		</>
	)
}

export default Header;