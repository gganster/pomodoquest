
import { Button } from "@/components/ui/button"
import { Power } from "lucide-react"
import { Outlet } from "react-router"

import useAuth from "@/contexts/auth";

import ThemeToggler from "@/components/ThemeToggler";

import Login from "@/components/Layout/login";
import { Link } from "react-router-dom";

export default function Layout() {
  const { isLogin, logout } = useAuth();

  return (
    <div>
      {/* header */}
      <div className="h-16 border-b flex items-center justify-between px-6">
        <div>
          <Link to="/" className="text-2xl font-semibold uppercase">Pomodo Quest</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          {!isLogin() ? <Login /> : (
            <Button variant="outline" onClick={logout}>
              <Power size={24} />
            </Button>
          )}
        </div>
      </div>
      {/* main content */}
      <div className="p-8">
        <Outlet />
      </div>
      {/* footer */}
    </div>
  )
}