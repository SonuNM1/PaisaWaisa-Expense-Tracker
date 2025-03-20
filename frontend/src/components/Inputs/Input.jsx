import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    // <div className='mb-4'>
    //   <label className='text-[13px] text-slate-800'>{label}</label>

    //   <div className='flex items-center border rounded-md px-2'>
    //     <input
    //       type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
    //       placeholder={placeholder}
    //       className='w-full bg-transparent outline-none'
    //       value={value}
    //       onChange={(e) => onChange(e)}
    //     />

    //     {type === 'password' && (
    //       showPassword ? (
    //         <FaRegEye
    //           size={22}
    //           className='text-primary cursor-pointer'
    //           onClick={toggleShowPassword}
    //         />
    //       ) : (
    //         <FaRegEyeSlash
    //           size={22}
    //           className='text-slate-400 cursor-pointer'
    //           onClick={toggleShowPassword}
    //         />
    //       )
    //     )}
    //   </div>
    // </div>
    <div className="mb-4">
  <label className="text-sm font-medium text-slate-800 mb-1 block">{label}</label>

  <div className="flex items-center border border-slate-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary">
    <input
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-sm text-slate-800"
      value={value}
      onChange={(e) => onChange(e)}
    />

    {type === 'password' && (
      showPassword ? (
        <FaRegEye
          size={20}
          className="text-primary cursor-pointer"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
        />
      )
    )}
  </div>
</div>

  )
}

export default Input
