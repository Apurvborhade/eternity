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
import React from 'react'
import { format } from 'date-fns'
import { useCreateCapsuleMutation } from '@/services/capsuleApi'
import { Link, useNavigate } from 'react-router-dom'
import { Icons } from '@/components/ui/icons'

interface CapsuleData {
    title: string,
    content: string,
    unlockDate: Date | undefined,
    status: string,
    notification: boolean
}
const CreateCapsule = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    const navigate = useNavigate();
    const [notificationSwitchValue, setNotificationSwitchValue] = React.useState(true)
    const handleNotificationSwitchChange = (checked: boolean) => {
        setNotificationSwitchValue(checked)
        setFormData({
            ...formData,
            notification: notificationSwitchValue
        })
    }
    const [createCapsule, { isLoading, error }] = useCreateCapsuleMutation();
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
    React.useEffect(() => {
        console.log(formData)
    },[formData])
    const saveCapsule = async () => {
        try {
            const capsule = await createCapsule(formData).unwrap();
            // setFormData({
            //     title: "",
            //     content: "",
            //     unlockDate: undefined,
            //     status: "",
            //     notification: true
            // })
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }



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
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Link to={'/dashboard'}>
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                            </Link>
                            <Button size="sm" onClick={saveCapsule}>
                                Save Capsule
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                                                value={formData.title}
                                                type="text"
                                                className="w-full"
                                                placeholder="Goals"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea
                                                id="content"
                                                name='content'
                                                value={formData.content}
                                                placeholder="Capsule Content"
                                                className="min-h-32"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle>Capsule Media</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <img
                                            alt="Product image"
                                            className="aspect-square w-full rounded-md object-cover"
                                            height="300"
                                            src="https://images.unsplash.com/photo-1556559322-b5071efadc88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            width="300"
                                        />
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="relative">
                                                <button>
                                                    <img
                                                        alt="Product image"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src="https://images.unsplash.com/photo-1556559322-b5071efadc88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                        width="84"
                                                    />
                                                </button>
                                                <button className="absolute top-1 right-1 bg-white bg-opacity-10 rounded-full p-1" aria-label="Delete image">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <button>
                                                    <img
                                                        alt="Product image"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src="https://images.unsplash.com/photo-1556559322-b5071efadc88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                        width="84"
                                                    />
                                                </button>
                                                <button className="absolute top-1 right-1 bg-white bg-opacity-10 rounded-full p-1" aria-label="Delete image">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
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
                                            <Select defaultValue="locked" onValueChange={handleChange} value={formData.status} >
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="locked">Locked</SelectItem>
                                                    <SelectItem value="unlocked">Unlocked</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                        {date ? format(date, "PPP") : <span>Unlock date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full max-w-full p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
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

export default CreateCapsule