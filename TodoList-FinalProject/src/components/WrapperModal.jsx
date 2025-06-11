function WrapperModal({ children }) {
  return (
    <div className='w-screen h-screen bg-black/20 fixed top-0 left-0'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 shadow-2xl rounded-md'>
            { children }
        </div>
    </div>
  )
}

export default WrapperModal