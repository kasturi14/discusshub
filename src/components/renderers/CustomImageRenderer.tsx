'use client'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full min-h-[15rem]'>
      <img alt='image' className='object-contain' src={src} />
    </div>
  )
}

export default CustomImageRenderer