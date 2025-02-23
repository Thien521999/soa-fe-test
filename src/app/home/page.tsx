import Footer from './_components/footer'
import Header from './_components/header'
import Main from './_components/main'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen mx-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
