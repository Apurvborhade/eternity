import { MainNav } from '@/components/dashboard/main-nav'
import { Search } from '@/components/dashboard/search'
import { UserNav } from '@/components/dashboard/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Trash, Unlock, UnlockIcon, UnlockKeyhole } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'
import { format } from 'date-fns'
import { useFetchCapsuleDetailsQuery } from '@/services/capsuleApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icons } from '@/components/ui/icons'

const CapsuleDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { data: capsule, isLoading, error } = useFetchCapsuleDetailsQuery(id!)
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading capsule details</div>

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
                            <p className="text-red-600 ">*{error.data.message}</p>
                        )}
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Link to={'/dashboard'}>
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                            </Link>
                            <Button variant="secondary" size="sm" onClick={handleDelete}>
                                Unlock 
                                <UnlockIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Capsule Details</CardTitle>
                                    <CardDescription>
                                        View and edit your capsule details below.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={capsule?.title}
                                                type="text"
                                                className="w-full"
                                                readOnly
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea
                                                id="content"
                                                value={capsule?.status === 'unlocked' ? capsule?.content : 'Not unlocked'}
                                                className="min-h-32"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Capsule Media</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        {capsule?.files?.length ? (
                                            <img
                                                alt="Capsule image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="300"
                                                src={capsule.files[0].url}
                                                width="300"
                                            />
                                        ) : (
                                            <div>No media uploaded</div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Capsule Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Status</Label>
                                            <Select value={capsule?.status}>
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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !capsule?.unlockDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {capsule?.unlockDate
                                            ? format(new Date(capsule.unlockDate), "PPP")
                                            : <span>Unlock date not set</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full max-w-full p-0" align="start">
                                    <Calendar mode="single" selected={capsule?.unlockDate ? new Date(capsule.unlockDate) : undefined} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CapsuleDetails
