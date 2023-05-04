import './globals.css'
import { Montserrat, Open_Sans } from 'next/font/google'
import CreateRace from './components/CreateRace'



const montserrat = Montserrat({
  weight: ['500'],
  subsets: ['latin'],
  style: ['italic'],
})

const openSans = Open_Sans({
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Race Mate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    </head>
      <body className={ openSans.className }>
        <div id="titlebar">
          <nav className="navbar">
            <a id="nav-title" className={ montserrat.className }>Race Mate</a>
          </nav>
        </div>
        <div id="description-block">
          <a id="description">
            Calculate the results of your sailing races and regattas using the PHRF rating system.
          </a>
        </div>
        
        <CreateRace />
        {children}

        <div id="gh-link-section">
          <a href="https://github.com/jessehanlon/race-mate" id="'gh-link">
            <img src="./github-mark.png" id="gh-logo"></img>
          </a>
        </div>
      </body>
    </html>
  )
}
