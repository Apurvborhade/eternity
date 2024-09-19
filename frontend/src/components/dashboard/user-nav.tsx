import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeUser } from "@/features/user/userSLice"
import { useLogoutUserMutation } from "@/services/userApi"
import { RootState } from "@/store"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"

export function UserNav() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user);
  const [logoutUser, { error, isLoading }] = useLogoutUserMutation();
  const logout = async () => {
    try {
      await logoutUser()
      Cookies.remove('user')
      dispatch(removeUser())
    } catch (error) {
      console.log(error)
    }
  }
  // Handle the error state
  if (error) {
    if ('data' in error) {
      return <div>{error.data.message}</div>;
    }
    return <div>{error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
             {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={logout}>
          Log out

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}