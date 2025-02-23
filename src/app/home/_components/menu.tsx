import Image from 'next/image'

interface MenuProps {
  menu: string[]
}

export default function Menu({ menu }: MenuProps) {
  return (
    <section className="block md:hidden">
      <input className="peer hidden" type="checkbox" name="" id="nav-mobile-input" />

      <div
        className="fixed inset-0 z-[2000] w-full max-w-full h-full min-h-screen bg-white p-4 backdrop-blur-[15px]
                -translate-x-full opacity-0 transition-transform duration-300 ease-linear peer-checked:translate-x-0 peer-checked:opacity-100"
      >
        <label htmlFor="nav-mobile-input" className="absolute right-4 top-4 cursor-pointer">
          <Image src="/icons/iconClose.svg" alt="close" width="19" height="19" />
        </label>

        <div className="text-4 font-bold text-gray-800 mb-6">LOGO SAMPLE</div>
        <ul className="flex flex-col gap-2 text-4 font-medium leading-6 opacity-90">
          {menu?.map((item) => (
            <li
              key={item}
              className="text-base text-[#562c2c] hover:text-[#8b5e3c] transition-colors duration-300"
            >
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
