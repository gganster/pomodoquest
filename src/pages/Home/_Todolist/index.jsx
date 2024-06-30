import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { getDoc, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import Item from "./item";

import { db } from "@/firebase";
import useAuth from "@/contexts/auth";

import AddTask from "./addTask";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function TodoListFeature() {
  const {auth} = useAuth();
  const [tasks, setTasks] = useState([]);

  const clearCompleted = () => {
    tasks.forEach((task) => {
      if (task.completed) {
        deleteDoc(doc(db, `users/${auth.user.uid}/tasks`, task.id));
      }
    })
  }
  const clearAll = () => {
    tasks.forEach((task) => {
      deleteDoc(doc(db, `users/${auth.user.uid}/tasks`, task.id));
    })
  }

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onSnapshot(collection(db, `users/${auth.user.uid}/tasks`), (snapshot) => {
      const tasks = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });

      setTasks(tasks);
    });

    return () => unsubscribe();
  }, [auth])

  return (
    <div>
        <div className="flex justify-between items-center">
          <div className="w-14"></div>
          {tasks.length === 0 ? (
            <>
              <div className="text-center text-gray-500 mt-4">
                No tasks yet
              </div>
            </>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <Ellipsis size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={clearCompleted}>
                Clear Completed tasks
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={clearAll}>
                Clear all tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      <div className="my-2"></div>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Item key={task.id} item={task} />
        ))}
      </div>

      <div className="my-8"></div>
      <AddTask />
    </div>
  )
}