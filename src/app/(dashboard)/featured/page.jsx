import FeaturedQuestionButtons from '@/components/FeaturedQuestionButtons'
import Hero from '@/components/Hero'

const page = () => {
  const HeroPropsInConvenientObject = {
    paragraph:
      'Sök din drömresa hos oss, vi tipsar om fantastiska destinartioner',
  }
  return (
    <div>
      <Hero textContent={HeroPropsInConvenientObject} />
      <FeaturedQuestionButtons />
    </div>
  )
}
export default page
