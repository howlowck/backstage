---
'@backstage/plugin-scaffolder-backend': minor
---

**BREAKING** TaskBroker and TaskWorker has a new eventEmitter argument
the same `eventEmitter` instance is **required** in the creation of the TaskBroker and the TaskWorker.
These changes are applied in `plugins/scaffolder-backend/src/service/router.ts`

```diff
+ import EventEmitter from 'events';

export interface RouterOptions {
...
+ eventEmitter?: EventEmitter;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
...

  const {
    ...
    additionalTemplateFilters,
+   eventEmitter,
  } = options;

...

+ const emitter = eventEmitter ?? new EventEmitter();

  let taskBroker: TaskBroker;
  if (!options.taskBroker) {
    ...
-   taskBroker = new StorageTaskBroker(databaseTaskStore, logger);    
+   taskBroker = new StorageTaskBroker(databaseTaskStore, logger, emitter);
  } 

  ...
  const workers = [];
  for (let i = 0; i < (taskWorkers || 1); i++) {
    const worker = await TaskWorker.create({
      ...
      additionalTemplateFilters,
+     eventEmitter: emitter
    });
    workers.push(worker);
  }
}
```

---------

TaskWorker has a new `listen` method that is non-blocking.

These changes are applied in `plugins/scaffolder-backend/src/service/router.ts`

```diff

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  ...

- workers.forEach(worker => worker.start());
+ workers.forEach(worker => worker.listen());

}
```

---------

A new `stress:waitWorkflow` action is added to builtin actions

A new template is created in `sample-templates` to make use of the newly created action.
