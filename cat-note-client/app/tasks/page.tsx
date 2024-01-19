'use client'

import React, {useEffect, useState} from 'react';
import ReactFlow, { Controls, Background, useNodesState } from 'reactflow';
import InitialNodes from './initialElements';
import 'reactflow/dist/style.css';
import './page.scss';
import TasksNode from "@/app/components/modules/tasksNode/tasksNode";
import {Task} from "@/app/ts/interfaces/task";
import TopUsersNode from "@/app/components/modules/topUsersNode/topUsersNode";
import {User} from "@/app/ts/interfaces/user";
import Paw from '../../public/paw.PNG'
import Image from "next/image";

function TasksPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(InitialNodes);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [nodeTypes, setNodeTypes] = useState({
    tasksNode: () => <TasksNode tasks={userTasks} onTaskCreate={(task : Task) => createTask(task)} onTaskDelete={(taskId: number) => deleteTask(taskId)} onTaskUpdate={(task: Task) => updateTask(task)}/>,
    topUsers: () => <TopUsersNode topUsers={topUsers}/>});

  useEffect(() => {
    loadTasks();
    loadTopUsers();
  }, []);

  useEffect(() => {
    setNodeTypes({
      tasksNode: () => (
        <TasksNode
          tasks={userTasks}
          onTaskCreate={(task: Task) => createTask(task)}
          onTaskDelete={(taskId: number) => deleteTask(taskId)}
          onTaskUpdate={(task: Task) => updateTask(task)}
        />
      ),
      topUsers: () => <TopUsersNode topUsers={topUsers} />
    });
  }, [userTasks]);

  const loadTopUsers = async () => {
    await fetch( `api/topUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        const topUsersResponse : User[] = await res.json();
        setTopUsers(topUsersResponse);
      })
  }

  const createTask = async (task: Task) => {
    await fetch(`/api/userTasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    await loadTasks()
  }

  const deleteTask = async (taskId: number) => {
    console.log("cat delete3")

    await fetch(`/api/userTasks/${taskId}`, {
      method: "DELETE"
    });

    await loadTasks();
  }

  const updateTask = async (task: Task) => {
    await fetch(`/api/userTasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    await loadTasks();
  }

  const loadTasks = async () => {
    const targetUserId = localStorage.getItem("targetUserId");

    await fetch(`/api/userTasks/${targetUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
  .then(async (res) => {
      const taskResponse : Task[] = await res.json();
      setUserTasks(taskResponse);
    })
  }

  return (
    <div className='tasksPage'>
      <Image className="tasksPage__paw" src={Paw} alt="Paw"/>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
        nodesDraggable
      >
        <Background className='tasksPage__background'/>
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TasksPage;
