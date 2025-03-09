import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
          <p className="text-muted-foreground">
            We're working hard to bring you this new feature. It will be available soon.
          </p>
        </div>

        <div className="h-px bg-border my-8" />

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Want to be notified when we launch?</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" required />
            <Button type="submit">Notify Me</Button>
          </form>
        </div>
      </div>
    </main>
  )
}

