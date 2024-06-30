import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { getDoc, collection, doc, onSnapshot } from "firebase/firestore";
import Item from "./item";

import { db } from "@/firebase";
import useAuth from "@/contexts/auth";

import AddTask from "./addTask";

export default function TodoListFeature() {
  const {auth} = useAuth();
  const [tasks, setTasks] = useState([]);

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
        <div className="flex justify-end items-center">
        <Button variant="outline">
          <Ellipsis size={24} />
        </Button>
      </div>
      <div className="my-2"></div>
      {tasks.map((task) => (
        <Item key={task.id} item={task} />
      ))}
      <div className="my-2"></div>
      <AddTask />
    </div>
  )
}