import PostOnPage from '../components/PostOnPage.js';

const Favorite = () => {
  return (
    <section className={`mb-20`}>
      <div className={`px-4`}>
        <PostOnPage favorites={true} />
      </div>
    </section>
  )
}

export default Favorite