import { useRef, useState } from "react"
import { CrossIconComp } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../../../config"

enum ContentType{
    YouTube = "youtube",
    Twitter = "twitter"

}

//controlled component
export const CreateModelContent = ({open, onClose}:{
    open:boolean,
    onClose: () => void
}) => {
        const titleRef = useRef<HTMLInputElement>(null);
        const linkRef = useRef<HTMLInputElement>(null); 
        const [type, setType] = useState(ContentType.YouTube);
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }
    
    return (
        <div>
            {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded-lg">
                            <div className="flex justify-end">
                                <div onClick={onClose} className=" cursor-pointer">
                                <CrossIconComp size={"lg"}/>
                                </div>
                            </div>
                            <div>
                            

                            <Input ref={titleRef} placeholder={"Text"}/>
                            
                            <Input ref={linkRef} placeholder={"Link"}/>
                            </div>
                            <div className="flex justify-center">
                                <h1>Type</h1>
                                
                                <Button onClick={() => {
                                    setType(ContentType.YouTube)
                                }} text={"YouTube"} size="sm" variant={type === ContentType.YouTube ? "primary": "secondary"}/>
                                <Button onClick={() => {
                                    setType(ContentType.Twitter)
                                }} text={"Twitter"} size="sm" variant={type === ContentType.Twitter ? "primary": "secondary"}/>
                            </div>
                            <div className="flex justify-center">

                            <Button onClick={addContent} size="md" variant={"primary"} text={"submit"}/>
                            </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}

