import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
interface Capsule {
    _id: string,
    title: string,
    content: string,
    unlockDate: string,
    createdBy: string,
    status: string,
    media: string[],
    notification: boolean,
    createdAt: string[],
    updatedAt: string[],
    __v: number

}
// Define the props interface for CapsuleCard
interface CapsuleCardProps {
    capsule: Capsule;
}
const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule }) => {
    const [notificationSwitchValue, setNotificationSwitchValue] = useState(capsule.notification)
    const handleNotificationSwitchChange = (checked: boolean) => {
        setNotificationSwitchValue(checked)
    }
    return (
        <div className="w-full max-w-md p-6 bg-card text-card-foreground shadow-sm rounded-lg border" key={capsule._id}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{capsule.title}</h3>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">
                            Notifications
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {capsule.notification ? 'On' : 'Off'}
                        </p>
                    </div>
                    <Switch checked={notificationSwitchValue} onCheckedChange={handleNotificationSwitchChange} />
                </div>
            </div>
            {capsule.status === 'unlocked' ? (
                <p className="text-sm text-muted-foreground mb-4">
                    {capsule.content}
                </p>
            ) : (
                <p className="text-sm text-muted-foreground mb-4 text-orange-400">
                    Capsule content can be viewed once its unlocked.
                </p>
            )}
            <div className="flex justify-between items-center">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Unlock Date
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {format(capsule.unlockDate.slice(0, 10), 'PPP')}
                    </p>
                </div>
                <div className="flex-1 space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">
                        Status
                    </p>
                    <div className="flex items-center justify-end mt-1">
                        <div className={`w-2 h-2 rounded-full mr-2 ${capsule.status === 'unlocked' ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                        <p className="text-sm text-muted-foreground">
                            {capsule.status}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/capsule/update-capsule/${capsule._id}`}>
                <Button className="w-full mt-4">View Details</Button>
            </Link>
        </div>
    )
}

export default CapsuleCard