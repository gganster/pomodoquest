import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {PlusCircle, X} from "lucide-react";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";
import useAuth from "@/contexts/auth";

export default function AddTask() {
  const {auth} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) return;
      await addDoc(collection(db, `users/${auth.user.uid}/tasks`), {
        title,
        completed: false
      });
      setTitle("");
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {isOpen ?
        <Card>
          <CardHeader className="relative -mb-3">
            <CardTitle className="text-xl">Add task</CardTitle>
            <X className="cursor-pointer absolute top-3 right-3" onClick={() => setIsOpen(false)} />
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex items-center gap-1">
              <Input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
              <div className="flex justify-end gap-2 ">
                <Button type="submit">Add</Button>
              </div>
            </CardContent>
          </form>
        </Card>
      : 
        <div
          onClick={() => setIsOpen(true)}
          className="border border-dashed flex items-center gap-2 justify-center h-20 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer mt-4 rounded">
          <h4 className="relative top-0.5 text-lg">Add task</h4>
          <PlusCircle size={24} />
        </div>
      }
    </>
  )
}