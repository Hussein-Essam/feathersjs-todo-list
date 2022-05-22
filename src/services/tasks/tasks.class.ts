import { Params } from "@feathersjs/feathers";
import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "../../declarations";

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  updateAt: Date;
}

export class Tasks extends Service<TaskData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
  // Sample shows how to overwrite `create` method
  // Call the original `create` method with existing `params` and new data
  async create(data: TaskData, params?: Params) {
    const { title, description } = data;
    const taskData = { title, description };
    return super.create(taskData, params);
  }
}
