import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function FileUploadComponent({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: File | undefined
  setSelectedFile: (file: File | undefined) => void
}) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (selectedFile) {
      console.log("yeah inside the useEffect")
      console.log("Selected file inside the useEffect", selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      console.log("Url inside the useEffect", url)
      console.log("Preview url inside useEffect", previewUrl)
    }

    setPreviewUrl(undefined)
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Hey hey")
    const file = e.target.files?.[0]
    setSelectedFile(file)
    console.log("Selected file", selectedFile)
  }

  const handleRemoveFile = () => {
    setSelectedFile(undefined)
  }

  return (
    <div className="container mx-auto p-4">
      <label className="flex absolute left-0 bottom-0 mx-7 mb-3">
        <svg
          className="w-6 h-6 hover:cursor-pointer transform-gpu active:scale-75 transition-all text-neutral-500"
          aria-label="Attach media"
          role="img"
          viewBox="0 0 20 20"
        >
          <title>Attach media</title>
          <path
            d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
            className="fill-current"
          ></path>
        </svg>

        <input
          className="bg-transparent flex-1 border-none outline-none hidden"
          name="media"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
        />
      </label>

      {previewUrl && (
        <div className="w-full p-2">
          <div className=" w-max">
            <Image
              src={previewUrl}
              alt="Selected"
              className="object-cover w-32 h-32"
              width={128}
              height={128}
            />
            <button
              onClick={handleRemoveFile}
              type="button"
              className="absolute -top-3 -right-3 flex items-center justify-center px-1 py-1 w-7 h-7 rounded-full text-white bg-red-500 hover:bg-red-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
