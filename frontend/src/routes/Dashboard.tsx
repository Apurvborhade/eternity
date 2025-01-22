import CapsuleCard from '@/components/dashboard/CapsuleCard'
import { MainNav } from '@/components/dashboard/main-nav'
import { Search } from '@/components/dashboard/search'
import { UserNav } from '@/components/dashboard/user-nav'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { getCapsule } from '@/features/capsules/capsuleSlice'
import { useFetchCapsulesQuery } from '@/services/capsuleApi'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

interface Capsule {
    _id: string,
    title: string,
    content: string,
    unlockDate: string,
    createdBy: string,
    status: string,
    media: string[],
    createdAt: string[],
    updatedAt: string[],
    __v: number

}
const Dashboard = () => {
    const user = useSelector((state: RootState) => state?.user)
    const [notificationSwitchValue, setNotificationSwitchValue] = useState(true)
    const handleNotificationSwitchChange = (checked: boolean) => {
        setNotificationSwitchValue(checked)
    }
    const { data, error, isLoading, } = useFetchCapsulesQuery();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])
    useEffect(() => {
        if (data) {
            dispatch(getCapsule(data))
        }
    }, [data])


    // Handle the error state
    if (error) {
        if ('data' in error) {
            return <div>{error.data.message}</div>;
        }
        return <div>{error.message}</div>;
    }
    
    return (
        <>
            <div className="flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="md:mx-2" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">All Capsules</h1>
                </div>
                <div
                    className={` ${data?.length == 0 ? 'flex flex-1 items-center justify-center px-10 border border-dashed' : 'grid 2xl:grid-cols-4 md:grid-cols-3 md:gap-x-5 grid-cols-1 row-auto gap-y-10'}  rounded-lg  shadow-sm  md:px-0`} x-chunk="dashboard-02-chunk-1"
                >
                    {data?.length == 0 && (
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no Capsules
                            </h3>
                            <p className="text-sm text-muted-foreground my-2">
                                Create your first Capsule to start preserving and sharing your memories.
                            </p>
                            <Link to="/capsule/create-capsule">
                                <Button className="mt-4">Add Capsule</Button>
                            </Link>
                        </div>
                    )}
                    {data?.length !== 0 && data?.map((capsule: Capsule) => (
                        <CapsuleCard capsule={capsule} />
                    ))}

                    {/* Capsule Component */}
                    {data?.length !== 0 && (
                        <Link to={"/capsule/create-capsule"} className="w-full max-w-md place-content-center place-items-center flex justify-center border border-dashed h-60 rounded">
                            <Button className="rounded-full w-10 h-10">+</Button>
                        </Link>
                    )}
                    {/* Skeleton for loading animation */}
                    {isLoading && (
                        <>
                            <div className="w-full max-w-md p-6 bg-card text-card-foreground shadow-sm rounded-lg border animate-pulse">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-6 bg-muted rounded w-1/3"></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 bg-muted rounded w-16"></div>
                                        <div className="h-5 w-9 bg-muted rounded-full"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                        <div className="h-4 bg-muted rounded w-2/3"></div>
                                    </div>
                                    <div className="flex-1 space-y-2 text-right">
                                        <div className="h-4 bg-muted rounded w-1/2 ml-auto"></div>
                                        <div className="h-4 bg-muted rounded w-2/3 ml-auto"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-muted rounded w-full mt-4"></div>
                            </div>
                            <div className="w-full max-w-md p-6 bg-card text-card-foreground shadow-sm rounded-lg border animate-pulse">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-6 bg-muted rounded w-1/3"></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 bg-muted rounded w-16"></div>
                                        <div className="h-5 w-9 bg-muted rounded-full"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                        <div className="h-4 bg-muted rounded w-2/3"></div>
                                    </div>
                                    <div className="flex-1 space-y-2 text-right">
                                        <div className="h-4 bg-muted rounded w-1/2 ml-auto"></div>
                                        <div className="h-4 bg-muted rounded w-2/3 ml-auto"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-muted rounded w-full mt-4"></div>
                            </div>
                            <div className="w-full max-w-md p-6 bg-card text-card-foreground shadow-sm rounded-lg border animate-pulse">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-6 bg-muted rounded w-1/3"></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 bg-muted rounded w-16"></div>
                                        <div className="h-5 w-9 bg-muted rounded-full"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                        <div className="h-4 bg-muted rounded w-2/3"></div>
                                    </div>
                                    <div className="flex-1 space-y-2 text-right">
                                        <div className="h-4 bg-muted rounded w-1/2 ml-auto"></div>
                                        <div className="h-4 bg-muted rounded w-2/3 ml-auto"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-muted rounded w-full mt-4"></div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    )
}

export default Dashboard