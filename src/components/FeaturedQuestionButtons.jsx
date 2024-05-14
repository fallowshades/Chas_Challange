'use client'
const FeaturedQuestionButtons = () => {
  const buttons = [
    { id: 1, text: 'Button 1' },
    { id: 2, text: 'Button 2' },
    { id: 3, text: 'Button 3' },
    { id: 4, text: 'Button 4' },
    { id: 5, text: 'Button 5' },
    { id: 6, text: 'Button 6' },
  ]

  return (
    <div className='relative flex place-items-center'>
      <div className='grid grid-cols-2 gap-8'>
        {buttons.map((button) => (
          <button
            key={button.id}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  )
}
export default FeaturedQuestionButtons
