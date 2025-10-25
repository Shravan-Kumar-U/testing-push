import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function SignIn(){
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signin(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username,
      password
    })
    const jwt = response.data.token;
    localStorage.setItem("token",jwt);
    //After signin redirect the user to the dashboard
    navigate("/dashboard")

  }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 min-w-64">
        <Input ref={usernameRef} placeholder="UserName" />
        <Input ref={passwordRef} placeholder="Password" />
        <Button onClick={signin} loading={false} variant={"primary"} size={"md"} text={"SignIn"} />
      </div>
    </div>
    )
}