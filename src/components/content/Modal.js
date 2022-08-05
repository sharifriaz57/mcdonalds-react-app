import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { TbShoppingCartOff } from "react-icons/tb";

const Modal = ({ isOpen, closeModal, cartLoading, addToCart, removeFromCart, deleteFromCart, getOccurrence }) => {
	const cart = useSelector(state => state.cart);

	return (
		<div className={`${isOpen ? '-translate-y-1/2 opacity-100' : 'translate-y-0 opacity-0 invisible'} modal fixed h-4/5 flex flex-col bg-white border 
      	border-slate-300 shadow-2xl rounded-xl left-1/2 top-1/2 -translate-x-1/2 z-30 ease-in-out duration-300`} style={{ width: '900px', maxWidth: '96%' }}>
			<div className="modal-header py-1 px-5 flex items-center justify-between shadow-[0_3px_5px_0_rgba(0,0,0,0.15)] z-20">
				<div></div>
				<h2 className="sm:text-3xl text-2xl font-semibold leading-tight">Cart</h2>
				<div className="cursor-pointer" onClick={closeModal}>
					<GrClose />
				</div>
			</div>
			<div className="modal-body rounded-xl rounded-tl-none rounded-tr-none flex grow overflow-y-auto">
				{cart.cartItems > 0
					? <div className="flex md:flex-nowrap flex-wrap w-full">
						<div className="md:w-7/12 w-full md:px-10 md:py-6 p-4 md:order-1 order-2 overflow-y-auto bg-slate-100">
							{cart.itemsInfo.map((item, key) =>
								<CartProduct key={key} item={item} cart={cart} cartLoading={cartLoading}
									addToCart={addToCart} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} getOccurrence={getOccurrence} />
								)
							}
						</div>
						<div className="md:w-5/12 w-full flex flex-col md:order-2 order-1 justify-center items-center lg:py-8 lg:px-12 p-6 bg-lightYellow">
							<div className="cart_price mb-5 w-full">
								<div className="flex justify-between my-1">
									<span className="text-base text-slate-600 font-medium">Total Items</span>
									<span className="text-lg text-slate-900 font-semibold">{cart.uniqueItems}</span>
								</div>
								<div className="flex justify-between my-1">
									<span className="text-base text-slate-600 font-medium">Total Quantity</span>
									<span className="text-lg text-slate-900 font-semibold">{cart.cartItems}</span>
								</div>
								<div className="flex justify-between my-1">
									<span className="text-base text-slate-600 font-medium">Subtotal</span>
									<span className="text-lg text-slate-900 font-bold">{cart.subTotal} AED</span>
								</div>
								<div className="flex justify-between my-1">
									<span className="text-base text-slate-600 font-medium">{`TAX (5%)`}</span>
									<span className="text-lg text-slate-900 font-bold">+ {cart.tax} AED</span>
								</div>
								<div className="flex items-center justify-between my-1 mt-8">
									<span className="flex items-center text-2xl text-slate-600 font-bold leading-none">Total<span className="ml-1 text-lg font-semibold leading-none">(incl. VAT)</span></span>
									<span className="text-2xl text-black font-black">{cart.total} AED</span>
								</div>
							</div>

							{/* <button className="block w-full py-2 px-5 text-lg font-bold rounded-lg leading-tight bg-white text-yellow-500">
								Print Bill
							</button> */}
						</div>
					</div>
					: <div className='h-full w-full flex flex-col items-center justify-center'>
						<TbShoppingCartOff className="text-8xl" />
						<h4 className='text-center text-2xl capitalize'>Cart is empty!</h4>
					</div>
				}
			</div>
		</div>
	)
}

export default Modal;