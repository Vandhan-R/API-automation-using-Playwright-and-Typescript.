//no -auth
//basic auth
//bearer toek
//api key

import{test,expect} from'@playwright/test'


test('no authorization', async({request})=>{

    //no authentication 
   const noauthreq= await request.get('https://jsonplaceholder.typicode.com/posts/1')
   expect(noauthreq.ok()).toBeTruthy()
   expect(noauthreq.status()).toBe(200)  
   const jsonnoauth=await noauthreq.json()
   console.log(jsonnoauth)

})


   //basic authentication
   test('basic authorization', async({request})=>
    {
 const basicrespon=await request.get('https://httpbin.org/basic-auth/user/pass',
    {
    headers:
    { 
        Authorization:'Basic '+Buffer.from("user:pass").toString('base64') 
    }
    })

  expect(basicrespon.ok()).toBeTruthy()
  expect(basicrespon.status()).toBe(200)
})


test("API key", async ({request})=>{
const APIresponse=await request.get('https://api.openweathermap.org/data/2.5/weather',{
   params: {
    appid:'4fc0eb0adf749e508361e264e7d1102a',
    q:'Dublin'
   }
})
expect(APIresponse.ok()).toBeTruthy()
expect(APIresponse.status()).toBe(200)
const jsonapi=await APIresponse.json()
console.log(jsonapi)

})