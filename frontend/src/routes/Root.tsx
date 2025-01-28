import { Button } from "@/components/ui/button"
import { Clock, Lock, Unlock, Send, Star } from "lucide-react"
import { Link } from "react-router-dom"

const Root = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" to="#">
          <Clock className="h-6 w-6 mr-2" />
          <span className="font-bold">TimeCapsule</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#pricing">
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex ml-10 flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Preserve Your Memories, Unlock Your Future
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Create digital time capsules to store your memories, goals, and dreams. Unlock them when the time is
                    right.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to={'/login'}>
                    <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
                  </Link>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Time Capsule Illustration"
                  width={700}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-md">
                <Lock className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-center text-gray-600">
                  Your memories are encrypted and safely stored until their unlock date.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-md">
                <Unlock className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold">Timed Unlocking</h3>
                <p className="text-center text-gray-600">
                  Set a future date to unlock your time capsule and relive your memories.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-md">
                <Send className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold">Multi-Media Support</h3>
                <p className="text-center text-gray-600">
                  Store text, images, videos, and more in your digital time capsule.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">1</div>
                <h3 className="text-xl font-bold">Create</h3>
                <p className="text-center text-gray-600">Sign up and start creating your digital time capsule.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">2</div>
                <h3 className="text-xl font-bold">Store</h3>
                <p className="text-center text-gray-600">Add memories, goals, and dreams to your capsule.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">3</div>
                <h3 className="text-xl font-bold">Unlock</h3>
                <p className="text-center text-gray-600">
                  When the time comes, unlock your capsule and relive your memories.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Basic</h3>
                <div className="text-center text-4xl font-bold mb-4">
                  $9.99<span className="text-lg font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />1 Time Capsule
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />
                    5GB Storage
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />1 Year Retention
                  </li>
                </ul>
                <Button className="mt-auto bg-black text-white hover:bg-gray-800">Choose Plan</Button>
              </div>
              <div className="flex flex-col p-6 bg-black text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Pro</h3>
                <div className="text-center text-4xl font-bold mb-4">
                  $19.99<span className="text-lg font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-white mr-2" />5 Time Capsules
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-white mr-2" />
                    25GB Storage
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-white mr-2" />5 Years Retention
                  </li>
                </ul>
                <Button className="mt-auto bg-white text-black hover:bg-gray-200">Choose Plan</Button>
              </div>
              <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Enterprise</h3>
                <div className="text-center text-4xl font-bold mb-4">Custom</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />
                    Unlimited Time Capsules
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />
                    Unlimited Storage
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-black mr-2" />
                    Lifetime Retention
                  </li>
                </ul>
                <Button className="mt-auto bg-black text-white hover:bg-gray-800">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
              Start Preserving Your Memories Today
            </h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl mx-auto mb-8">
              Join thousands of users who are already creating their digital time capsules. Don't let your precious
              memories fade away.
            </p>
            <Link to={'/login'}>
              <Button className="bg-white text-black hover:bg-gray-200">Get Started Now</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 TimeCapsule. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default Root