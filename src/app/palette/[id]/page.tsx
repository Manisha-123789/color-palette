import { ColorDetails } from "@/component/ColorDetails/ColorDetails";
import { Typography } from "@mui/material";


export default function Page({params}) {
 const id = params.id;
 console.log(id, 'kkkkkkkkkkk')
  return (
    <ColorDetails id={id}/>
    
  )
}
