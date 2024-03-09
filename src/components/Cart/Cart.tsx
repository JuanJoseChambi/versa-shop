

interface CartProp {
    visible:boolean;
    onClose:() =>  void
}

function Cart({visible, onClose}:CartProp) {
    if (!visible) return;

  return (
    <aside className="fixed right-0 top-0 py-5 px-4 w-[300px] h-screen bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5] z-20">
        <button className="absolute top-3 right-8 text-2xl text-black" onClick={onClose}>x</button>
        <h3 className="text-black text-2xl font-bold tracking-widest">CARRITO</h3>
    </aside>
  )
}

export default Cart