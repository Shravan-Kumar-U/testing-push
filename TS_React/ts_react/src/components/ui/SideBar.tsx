import { SideItem } from '../../components/ui/SideBarItem'
import { LogoBrain } from '../../icons/logo'
import { TwitterIcon } from '../../icons/Twitter'
import { YouTubeIcon } from '../../icons/Youtube'

export const SideBar = () => {
    return (
        <div className="h-screen bg-white border-gray-200 border w-72 fixed left-0 top-0 pl-6">
            <div className='flex text-4xl pt-6 items-center'>
                <div className='text-purple-700 pr-0.5'>

                <LogoBrain/>
                </div>
                <span className='pl-1.5'>Brainly</span>
            </div>
            <div className="pt-8 pl-4">
                <SideItem text={"Twitter"} icon={<TwitterIcon/>} />
                <SideItem text={"Youtube"} icon={<YouTubeIcon/>} />
            </div>
        </div>
    )
}