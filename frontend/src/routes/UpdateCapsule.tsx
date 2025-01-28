import { MainNav } from '@/components/dashboard/main-nav'
import { Search } from '@/components/dashboard/search'
import { UserNav } from '@/components/dashboard/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import React, { useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { capsulesApi, useCreateCapsuleMutation, useGetCapsuleByIdQuery, useGetMediaQuery, useUnlockCapsuleMutation } from '@/services/capsuleApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icons } from '@/components/ui/icons'
import { useDispatch } from 'react-redux'

interface CapsuleData {
    title: string,
    content: string,
    unlockDate: Date | undefined,
    status: string,
    notification: boolean
}
const UpdateCapsule = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    const [media, setMedia] = React.useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [notificationSwitchValue, setNotificationSwitchValue] = React.useState(true)
    const handleNotificationSwitchChange = (checked: boolean) => {
        setNotificationSwitchValue(checked)
        setFormData({
            ...formData,
            notification: notificationSwitchValue
        })
    }
    const [unlockCapsule, { data: unlockCapsuleData, isLoading: CapsuleUnlocking, error: capsuleUnlockError }] = useUnlockCapsuleMutation()
    const [createCapsule, { isLoading, error }] = useCreateCapsuleMutation();
    // const {data:media,error:MediaError} = useGetMediaQuery("innerve.jpg")

    const { data, isLoading: capsuleIDLoading, isError } = useGetCapsuleByIdQuery(id)
    const [formData, setFormData] = React.useState<CapsuleData>({
        title: "",
        content: "",
        unlockDate: undefined,
        status: "",
        notification: true
    });

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        setFormData({
            ...formData,
            unlockDate: newDate,
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
        if (typeof e != 'string') {
            if ('target' in e) {
                const { name, value } = e.target;
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        } else {
            console.log(setFormData({
                ...formData,
                status: e
            }))
        }
    }

    const saveCapsule = async () => {
    }
    const unlockDate = data?.unlockDate ? parseISO(data.unlockDate) : null;


    return (
        <div>
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
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:mt-20">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        {error && 'data' in error && (
                            <p className='text-red-600 '>*{error.data.message}</p>
                        )}
                    </div>
                    <div className="py-10 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Capsule Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                name='title'
                                                value={data?.title}
                                                type="text"
                                                className="w-full"
                                                placeholder="Goals"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Content</Label>
                                            {data?.status === 'locked' ? (
                                                <p className='text-orange-500'>Content is Locked Cannot be changed</p>
                                            ) : (
                                                <Textarea
                                                    id="content"
                                                    name='content'
                                                    value={data?.content}
                                                    placeholder="Capsule Content"
                                                    className="min-h-32"
                                                />

                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Capsule Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Status</Label>
                                            <Select defaultValue="locked" value={data?.status} >
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="locked">Locked</SelectItem>
                                                    <SelectItem value="unlocked">Unlocked</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {data?.status === 'locked' && (
                                                <>
                                                    <Button onClick={() => unlockCapsule(data?._id)}>{CapsuleUnlocking ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />:'Unlock Capsule'}</Button>
                                                    {capsuleUnlockError ?<p className='text-red-600'>{capsuleUnlockError.data?.message}</p>  : null}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-5">
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>
                                        Enable or disable notifications for this capsule.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="notifications">Enable Notifications</Label>
                                        <Switch id="notifications" name='notification' checked={notificationSwitchValue} onCheckedChange={handleNotificationSwitchChange} />
                                    </div>
                                </CardContent>
                            </Card>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(unlockDate, "PPP")}
                                    </Button>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm">Save Product</Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UpdateCapsule