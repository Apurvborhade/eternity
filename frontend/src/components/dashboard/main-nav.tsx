import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { CircleUser } from "lucide-react"
import { Menu } from "lucide-react"
import { Package2 } from "lucide-react"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4  bg-background px-4 md:px-6">
            <nav
                className={cn("md:flex hidden items-center space-x-4 lg:space-x-6  ", className)}
                {...props}
            >
                <Link
                    to="/dashboard"
                    className="text-4xl font-medium transition-colors hover:text-primary leading-none flex items-center justify-center"
                >
                    ∞
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="/dashboard"
                            className="text-4xl font-medium transition-colors hover:text-primary leading-none"
                        >
                            ∞
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-lg font-thin transition-colors hover:text-primary"
                        >
                            Overview
                        </Link>
                        <Link
                            to="/dashboard/customers"
                            className="text-lg font-thin text-muted-foreground transition-colors hover:text-primary"
                        >
                            Customers
                        </Link>
                        <Link
                            to="/dashboard/products"
                            className="text-lg font-thin text-muted-foreground transition-colors hover:text-primary"
                        >
                            Products
                        </Link>
                        <Link
                            to="/dashboard/settings"
                            className="text-lg font-thin text-muted-foreground transition-colors hover:text-primary"
                        >
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </header >
    )
}