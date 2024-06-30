import { useEffect, useState } from "react"
import { Alert, AlertTitle} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Circle, CircleCheck, Edit, Ellipsis, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {updateDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from "@/firebase";
import useAuth from "@/contexts/auth";

export default function Item({item}) {
  const {auth} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(item.title);

  const _updateTodo = async (id, data) => {
    await updateDoc(doc(db, `users/${auth.user.uid}/tasks`, id), data);
  }

  const _deleteTodo = async (id) => {
    await deleteDoc(doc(db, `users/${auth.user.uid}/tasks`, id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    _updateTodo(item.id, {title});
    setIsOpen(false);
  }

  useEffect(() => {
    setTitle(item.title)
  }, [isOpen])

  return (
    <Alert className="flex justify-between p-3">
      <div className="flex items-center gap-2 flex-1">
        {item.completed ? 
          <CircleCheck className="h-5 w-5 cursor-pointer" onClick={() => _updateTodo(item.id, {completed: false})} /> 
        : 
          <Circle className="h-5 w-5 cursor-pointer" onClick={() => _updateTodo(item.id, {completed: true})} />
        }
        {isOpen ? 
          <form className="flex-1 flex items-center" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Button type="submit"><Edit size={20} /></Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              <X size={20}  />
            </Button>
          </form>
        : 
          <AlertTitle className="mt-1 -mb-0.5">
            {item.title}
          </AlertTitle>
        }
      </div>
      <div>
        {!isOpen ? <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <Ellipsis size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => _deleteTodo(item.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        : null}
      </div>
    </Alert>
  )
}