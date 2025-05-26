import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between mx-12 py-5'>
      <div>
        <h2 className='text-2xl font-bold'>Gyan Saathi</h2>
      </div>
      <div className='flex gap-3'>
        <Link href='/'>Home</Link>
        <Link href='/ai'>AI</Link>
        <Link href='/notes'>Notes</Link>
        <Link href='/discussion'>Discussion</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact Us</Link>
      </div>
    </div>
  )
}

export default Navbar