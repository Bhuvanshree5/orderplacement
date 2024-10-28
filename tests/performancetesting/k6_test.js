import http from  'k6/http';
import {check,sleep} from 'k6';

export let options = {
    stage : [
        {duration:"10s",target:"10"},
        {duration:"30s",target:"50"},
        {duration:"10s",target:"50"},
    ]
}

export default function(){
 const res = http.post("http://localhost:3000/api/users/register",JSON.stringify({
        name:"bhuvi",
        email:"bhuvi@bhuvi",
        password:"bhuvi@bhuvi",
        role:"admin"
    }) ,{header:{"content-type":"application/json"}} )
    check(res,{"status is 200":(r) => r.status === 200})
    sleep(1)
}