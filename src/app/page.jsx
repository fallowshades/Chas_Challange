import { dbConnect } from '@/utils/mongoose';
import TaskCard from '@/components/TaskCard';
import Task from '@/models/Task';
import AllShadCn from '@/components/LibAllShadCn';
import FlowbitComponents from '@/components/LibFlowbitComponents';
import SemanticComponent from '@/components/LibSemantic';
export async function loadTasks() {
  await dbConnect();
  const tasks = await Task.find();
  return tasks;
}

export default async function HomePage() {
  const tasks = await loadTasks();

  const convenientFindLibraryComponents = true;

  return (
    <div className='grid md:grid-cols-3 gap-2'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
      {convenientFindLibraryComponents && (
        <div>
          {' '}
          <AllShadCn />
          <FlowbitComponents />
          <SemanticComponent />
        </div>
      )}
    </div>
  );
}
