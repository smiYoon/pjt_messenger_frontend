
export async function fetchInitData(){
    const response = await fetch("https://localhost:443/chat/init");
;
    if (!response.ok) {
        throw new Error("초기데이터 가져오기 실패");

    }
    
    const result=await response.json(); //{empList:[...], pjList:[...], dtList:[...]}
    console.log("초반 데이터 내놔:", result);
    
    return result;
   

}//fetchInitData