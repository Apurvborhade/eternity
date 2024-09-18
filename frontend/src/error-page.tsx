import { useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string, message: string };
  console.log(error)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center dark">
      <Card className="w-[350px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">404</CardTitle>
          <CardDescription>Oops! Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="/">
            <Button variant="secondary">
              Go Back
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ErrorPage