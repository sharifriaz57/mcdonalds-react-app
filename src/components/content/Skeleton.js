
const Skeleton = ({ count = 1, loading = true, type = 'product' }) => {
    const skel = [];
    const skel2 = [];

    for (let i = 1; i <= count; i++) {
        skel.push(
            <div key={i} className={`product_skeleton border shadow rounded-md p-4 mb-4 w-full mx-auto ${loading ? '' : 'hidden' }`}>
                <div className="animate-pulse flex items-center space-x-4">
                    <div className="rounded-full bg-lightYellow h-32 w-32"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-lightYellow rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-lightYellow rounded col-span-2"></div>
                                <div className="h-2 bg-lightYellow rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-lightYellow rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    for (let i = 1; i <= count; i++) {
        skel2.push(
            <div key={i} className={`product_skeleton border shadow px-4 py-2 mb-4 w-full mx-auto ${loading ? '' : 'hidden' }`}>
                <div className="animate-pulse flex items-center space-x-4">
                    <div className="rounded-full bg-lightYellow h-14 w-14 mr-2"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-lightYellow rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                type === `product`
                    ? skel
                    : skel2
            }   
        </>
    )
}

export default Skeleton;