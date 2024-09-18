"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegisterUserMutation, useLoginUserMutation } from "@/services/userApi"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { addUser } from "@/features/user/userSLice"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoginPage: boolean
}
interface UserFormData {
  username?: string,
  email: string,
  password: string
}
export function UserAuthForm({ className, isLoginPage, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = React.useState(Cookies.get('user'));
  const [formData, setFormData] = React.useState<UserFormData>(isLoginPage ? {
    email: '',
    password: ''
  } : {
    username: '',
    email: '',
    password: ''
  })

  const [registerUser, { isLoading: isRegisterLoding, error: registerError }] = useRegisterUserMutation();

  const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    try {
      if (!isLoginPage) {
        const user = await registerUser(formData).unwrap()
        Cookies.set('user', JSON.stringify(user), {
          expires: new Date(new Date().getTime() + 60 * 60 * 1000) // in 1 Hour
        })
        setUser(Cookies.get('user'))
      } else {
        const user = await loginUser(formData).unwrap()
        Cookies.set('user', JSON.stringify(user), {
          expires: new Date(new Date().getTime() + 60 * 60 * 1000) // in 1 Hour
        })
        setUser(Cookies.get('user'))
      }

      setFormData({
        username: '',
        email: '',
        password: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const userObject = user ? JSON.parse(user) : undefined
    if (user) {
      dispatch(addUser(userObject))
      navigate('/dashboard')
    }
  }, [user])
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {!isLoginPage && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                value={formData.username}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isRegisterLoding || isLoginLoading}
              />
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
              name="email"
              value={formData.email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isRegisterLoding || isLoginLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isRegisterLoding || isLoginLoading}
            />
          </div>
          <Button disabled={isRegisterLoding || isLoginLoading}>
            {isRegisterLoding || isLoginLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoginPage ? "Sign In with Email" : "Sign Up with Email"}
          </Button>
        </div>
        {loginError && 'data' in loginError && (
          <p className="text-red-600 my-3">{loginError?.data.message}</p>
        )}
        {registerError && 'data' in registerError && (
          <p className="text-red-600 my-3">{registerError?.data.message}</p>
        )}
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isRegisterLoding || isLoginLoading}>
        {isRegisterLoding || isLoginLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}