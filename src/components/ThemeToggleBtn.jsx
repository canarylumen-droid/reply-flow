import React from 'react'
import assets from '../assets/assets'

const ThemeToggleBtn = ({ theme, setTheme }) => {
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button
      onClick={toggle}
      className="size-9 p-1.5 border border-gray-500 rounded-full flex items-center justify-center"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <img src={theme === 'dark' ? assets.sun_icon : assets.moon_icon} alt="" />
    </button>
  )
}

export default ThemeToggleBtn
