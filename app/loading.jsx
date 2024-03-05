

export default function AllPagesLoading(){
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-60">
            <div className='flex flex-col'>
                <div className=" absolute top-0 left-0 w-full h-full">
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className='animate-move-up-rotate'>
                        <img 
        src={'/logo_app.jpg'} className="h-[400px] w-[700px]" />
          </div>
                        <span className='mt-5 text-4xl text-blue-600'>Please wait...</span>
                    </div>
                </div>

            </div>

        </div>
    );
} 
