import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, PlusCircle } from "lucide-react";
import TodoListFeature from "./_Todolist";

export default function Home() {
  return (
    <div className="max-w-[600px] mx-auto">
      <Card>
        <CardContent>
          <div className="flex items-center justify-center p-6 gap-2">
            <Button variant="outline">Pomodoro</Button>
            <Button variant="outline">Short Break</Button>
            <Button variant="outline">Long Break</Button>
          </div>
          <div className="flex justify-center items-center">
            //TODO timer view
          </div>
          <div className="flex justify-center items-center">
            //TODO timer controls
          </div>
        </CardContent>
      </Card>
      <Separator className="my-4" />
      <TodoListFeature />
    </div>
  )
}