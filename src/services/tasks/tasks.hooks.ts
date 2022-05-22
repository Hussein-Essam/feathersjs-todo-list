import { HooksObject, HookContext } from "@feathersjs/feathers";
import * as authentication from "@feathersjs/authentication";
import { Tasks, TaskData } from "./tasks.class";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const sanitizeTaskOnCreate = () => {
  return async (context: HookContext) => {
    const {
      title,
      description,
    }: { title: TaskData["title"]; description: TaskData["description"] } =
      context.data;
    if (!title) throw new Error("A task must has a title");
    if (title.trim().length === 0)
      throw new Error("A task title must not be empty");
    const trimmedTitle = title.trim().substring(0, 20);
    if (!description) throw new Error("A task must has a description");
    if (description.trim().length === 0)
      throw new Error("A task description must not be empty");
    const trimmedDescription = description.trim().substring(0, 120);
    context.data = {
      title: trimmedTitle,
      description: trimmedDescription,
    };
    return context;
  };
};
const sanitizeTaskOnUpdate = () => {
  return async (context: HookContext) => {
    const { title, description, isDone }: TaskData = context.data;
    if (!title) throw new Error("A task must has a title");
    if (title.trim().length === 0)
      throw new Error("A task title must not be empty");
    const trimmedTitle = title.trim().substring(0, 20);
    if (!description) throw new Error("A task must has a description");
    if (description.trim().length === 0)
      throw new Error("A task description must not be empty");
    const trimmedDescription = description.trim().substring(0, 120);
    if (!isDone && isDone !== false) throw new Error("A task must has status");
    context.data = {
      title: trimmedTitle,
      description: trimmedDescription,
      isDone,
    };
    return context;
  };
};
const sanitizeTaskOnPatch = () => {
  return async (context: HookContext) => {
    const { title, description, isDone }: TaskData = context.data;
    const newContextData = {} as {
      title: string;
      description: string;
      isDone: boolean;
    };
    if (title) {
      if (title.trim().length === 0)
        throw new Error("A task title must not be empty");
      const trimmedTitle = title.trim().substring(0, 20);
      newContextData.title = trimmedTitle;
    }
    if (description) {
      if (description.trim().length === 0)
        throw new Error("A task description must not be empty");
      const trimmedDescription = description.trim().substring(0, 120);
      newContextData.description = trimmedDescription;
    }
    console.log({ isDone });

    if (isDone && (isDone === true || isDone === false)) {
      newContextData.isDone = isDone;
    }
    context.data = newContextData;
    return context;
  };
};

export default {
  before: {
    all: [],
    // all: [authenticate("local")], // uncomment to authenticate user
    find: [],
    get: [],
    create: [sanitizeTaskOnCreate()],
    update: [sanitizeTaskOnUpdate()],
    patch: [sanitizeTaskOnPatch()],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
