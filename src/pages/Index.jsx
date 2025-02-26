import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const saveEditTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? { ...task, text: editTaskText } : task)));
    setEditTask(null);
    setEditTaskText("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <ScrollArea className="h-64">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
                <span>{task.text}</span>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="outline" size="sm" onClick={() => startEditTask(task)}>
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)}>
                          Delete
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">Total Tasks: {tasks.length}</CardFooter>
      </Card>

      {editTask && (
        <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Modify the task text and save your changes.</DialogDescription>
            </DialogHeader>
            <div className="flex space-x-2 mb-4">
              <Input
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                placeholder="Edit task"
                className="flex-grow"
              />
              <Button onClick={saveEditTask}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;