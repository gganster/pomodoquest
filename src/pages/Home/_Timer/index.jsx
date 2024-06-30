import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function TimerFeature() {
  return (
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
  )
}