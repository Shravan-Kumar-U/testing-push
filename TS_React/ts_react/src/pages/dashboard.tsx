import { Button } from '../components/ui/Button'
import { IconPlus } from '../icons/PlusIcon'
import { ShareIconBtn } from '../icons/ShareIcon'
import { CardComp } from '../components/ui/Card'
import { CreateModelContent } from '../components/ui/CreateContentModel'
import { useEffect, useState } from 'react'
import { SideBar } from '../components/ui/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

export function DashBoard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh} = useContent();
  useEffect(() => {
      refresh();
  },[modelOpen])
  
  return (
    <div>
      <SideBar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-gray-10'>
      <div className='flex justify-end gap-4'>
      <Button startIcon = {<IconPlus size='md'/>} endIcon={<ShareIconBtn size='md'/>} variant='secondary' size='md' text='Add context' onClick={() => {setModelOpen(true)}} />
      <Button startIcon = {<IconPlus size='md'/>} endIcon={<ShareIconBtn size='md'/>} variant='primary' size='md' text='Share Brain' onClick={async() => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
          share: true
        },{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        const shareUrl = `http://localhost:5173/dashboard${response.data.hash}`;
        alert(shareUrl);
      }}/>
      
      </div>
      <div className='flex gap-2 flex-wrap'>
        
        {contents.map(({type, link, title}) => 
          <CardComp type={type} link={link} title={title}/>
        )}

      <CardComp type={"twitter"} link={"https://x.com/kirat_tw/status/1633685473821425666"} title={"First tweet"}/>
      <CardComp type={"youtube"} link={"https://www.youtube.com/watch?v=hhqwUW17IGg"} title={"First tweet"}/>
      </div>
      <div>
      <CreateModelContent open={modelOpen} onClose={() => {
        setModelOpen(false);
      }}/>
      </div>
      </div>
    </div>
  )
}


