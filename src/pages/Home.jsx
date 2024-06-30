import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menubar } from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, PlusCircle } from "lucide-react";

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
      <div className="flex justify-end items-center">
        <Button variant="outline">
          <Ellipsis size={24} />
        </Button>
      </div>



      <div className="border border-dashed flex items-center gap-2 justify-center h-20 hover:bg-slate-100 cursor-pointer mt-4">
        <h4 className="relative top-0.5 text-lg">Add task</h4>
        <PlusCircle size={24} />
      </div>
    </div>
  )
}