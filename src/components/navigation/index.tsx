"use client"
// import Login from '@/in/en/(auth)/login/page'
// import About from '@/in/en/about/page'
// import Career from '@/in/en/career/page'
// import Contact from '@/in/en/contact/page'
// import Services from '@/in/en/services/page'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from "./Navigation.module.css";
import Home from '@/app/page';
import About from '@/app/in/en/about/page';
import Services from '@/app/in/en/clientportal/services/page';
import Career from '@/app/in/en/career/page';
// import Products from '@app/in/en/products/page'
import Contact from '@/app/in/en/contact/page';
import Login from '@/app/in/en/(auth)/login/page';
// import Home from '@/page'

const Navigation: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav>
      <Link href='/' className={pathname === "/" ? styles.active : ""}>
        <Home />
      </Link>
      <Link href='/about' className={pathname === "/about" ? styles.active : ""}>
        <About />
      </Link>
      <Link href='/services' className={pathname === "/services" ? styles.active : ""}>
        <Services />
      </Link>
      {/* <Link href='/products' className={pathname === "/products" ? styles.active : ""}>
        <Products />
      </Link> */}
      <Link href='/career' className={pathname === "/career" ? styles.active : ""}>
        <Career />
      </Link>
      <Link href='/contact' className={pathname === "/contact" ? styles.active : ""}>
        <Contact />
      </Link>
      <Link href='/login' className={pathname === "/login" ? styles.active : ""}>
        <Login />
      </Link>
    </nav>
  )
}

export default Navigation