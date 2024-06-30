import { Separator } from "@/components/ui/separator";

import TimerFeature from "./_Timer";
import TodoListFeature from "./_Todolist";

export default function Home() {
  return (
    <div className="max-w-[600px] mx-auto">
      <TimerFeature />
      <Separator className="my-8" />
      <TodoListFeature />
    </div>
  )
}