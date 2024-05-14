import { dbConnect } from '@/utils/mongoose'
import TaskCard from '@/components/TaskCard'
import Task from '@/models/Task'

export async function loadTasks() {
  await dbConnect()
  const tasks = await Task.find()
  return tasks
}

const page = async () => {
  const tasks = await loadTasks()

  const personImg =
    'https://media.istockphoto.com/id/1437816897/sv/foto/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring-or.jpg?s=612x612&w=is&k=20&c=qVk5imD72SQIEw4EepIZEshWounStGku56lTX3lISEI='
  const personImg2 =
    'https://media.istockphoto.com/id/1158687574/sv/foto/ung-flicka-som-ler-i-skolan.jpg?s=612x612&w=is&k=20&c=eYdrLIlo8eF7saOLsvUpWD950Q6RkUrS-fM2_-fb8oo='
  return (
    <div>
      {tasks.map((task, index) => (
        <div>
          <div
            className={index % 2 === 0 ? 'chat chat-start' : 'chat chat-end'}
          >
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS chat bubble component'
                  src={index % 2 === 0 ? personImg : personImg2}
                />
              </div>
            </div>
            <div className='chat-bubble'>
              <TaskCard task={task} key={task._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default page
