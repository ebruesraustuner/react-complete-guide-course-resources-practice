import { TaskItem } from "./task";

export interface ProjectItem {
    title: string,
    date: Date,
    id: string,
    detail: string,
    tasks: Array<TaskItem>
}