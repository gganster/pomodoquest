import {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useAuth from "@/contexts/auth"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(mail, password)
    } catch (e) {
      console.error(e);
    }
  }

  const handleGoToRegister = () => {
    setOpen(false);
    navigate("/register");
  }

  return (
    <Sheet open={open} onOpenChange={e => setOpen(e)}>
      <SheetTrigger asChild>
        <Button variant="outline">
          SignIn
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Login</SheetTitle>
            <SheetDescription>
              Sign in to your account to save your tasks and progress.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Mail
              </Label>
              <Input id="mail" placeholder="elon.musk@spacex.com" className="col-span-3" value={mail} onChange={e => setMail(e.target.value)}  />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input id="password" placeholder="@peduarte" className="col-span-3" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Log in</Button>
            </SheetClose>
          </SheetFooter>
          <Separator className="my-4"/>
          <p className="text-center">No account ? click <Button variant="link" onClick={handleGoToRegister}>here</Button></p>
        </form>
      </SheetContent>
    </Sheet>
  )
}
