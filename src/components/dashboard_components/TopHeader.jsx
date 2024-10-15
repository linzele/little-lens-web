import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TopHeader(props) {
  return (
    <div className='w-full h-[10%]  p-5 flex flex-col '>
            
    {/*Search bar*/}
    <div className='flex flex-row w-full justify-between  mt-5 items-center'>
    <h1 className="text-3xl md:text-4xl font-semibold text-gray-500">DashBoard {' > '} {props.header}</h1>

      {props.header === "Accounts" &&
        <Button className="flex items-center gap-2 ">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_89)">
        <path d="M14.8125 9.75H11.25V6.1875C11.25 6.08438 11.1656 6 11.0625 6H9.9375C9.83438 6 9.75 6.08438 9.75 6.1875V9.75H6.1875C6.08438 9.75 6 9.83438 6 9.9375V11.0625C6 11.1656 6.08438 11.25 6.1875 11.25H9.75V14.8125C9.75 14.9156 9.83438 15 9.9375 15H11.0625C11.1656 15 11.25 14.9156 11.25 14.8125V11.25H14.8125C14.9156 11.25 15 11.1656 15 11.0625V9.9375C15 9.83438 14.9156 9.75 14.8125 9.75Z" fill="white"/>
        <path d="M10.5 0C4.70156 0 0 4.70156 0 10.5C0 16.2984 4.70156 21 10.5 21C16.2984 21 21 16.2984 21 10.5C21 4.70156 16.2984 0 10.5 0ZM10.5 19.2188C5.68594 19.2188 1.78125 15.3141 1.78125 10.5C1.78125 5.68594 5.68594 1.78125 10.5 1.78125C15.3141 1.78125 19.2188 5.68594 19.2188 10.5C19.2188 15.3141 15.3141 19.2188 10.5 19.2188Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_5_89">
        <rect width="21" height="21" fill="white"/>
        </clipPath>
        </defs>
        </svg>
            Add {props.header}
        </Button>

      }
    </div>

    

</div>
  )
}
