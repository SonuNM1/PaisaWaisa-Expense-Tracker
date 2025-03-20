import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({image, setImage}) => {

  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if(file){
        // update the image state

        setImage(file) ; 

        // generate preview URL from the file 

        const preview = URL.createObjectURL(file)
        setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null) 
    setPreviewUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click() ; 
  }

  return (
    <div className='flex justify-center mb-8 max-w-md'>
        <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {
            !image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-300 rounded-full relative'>
                    <LuUser className='text-4xl'/>

                    <button 
                        type='button' 
                        className='w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1 transition hover:bg-purple-800 hover:scale-110 hover:cursor-pointer' 
                        onClick={onChooseFile}
                        aria-label='Upload profile photo'
                    >
                      <LuUpload size={18} />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt='profile photo'
                        className='w-20 h-20 rounded-full object-cover'
                    />
                    <button 
                        type='button' 
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 transition hover:bg-red-800 hover:scale-110 hover:cursor-pointer' 
                        onClick={handleRemoveImage}
                    >
                        <LuTrash/>
                    </button>
                </div>
            )
        }

    </div>
  )
}

export default ProfilePhotoSelector
