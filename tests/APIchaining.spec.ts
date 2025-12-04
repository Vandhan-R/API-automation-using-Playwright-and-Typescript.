import {test,expect} from '@playwright/test'
import fs from 'fs'

test('creating a booking @sanity', async({request})=>{

// creating a bookind id
    const jsondata='Test Data/POSTreq.json' //    // getting the body data from jason file

    const bodydata=JSON.parse(fs.readFileSync(jsondata,'utf-8'))

    const postresponse=await request.post('/booking',{data:bodydata})
    expect(postresponse.ok()).toBeTruthy()
    expect(postresponse.status()).toBe(200)

    const jsonbdy=await postresponse.json()
    const Bookingid=await jsonbdy.bookingid
    console.log("bookingid==>",Bookingid)

    // creatiing the token response
   const jsonfile='Test Data/Tokenreq.json' //    // getting the body data from jason file
   const jasondata1=JSON.parse(fs.readFileSync(jsonfile,'utf-8'))

   const tokenresponse=await request.post('/auth',{data:jasondata1})
   expect (tokenresponse.ok()).toBeTruthy()
   expect(tokenresponse.status()).toBe(200)

   const jsontoken=await tokenresponse.json()
  const tokenid= await jsontoken.token  
  console.log("token ===>",tokenid)


  // updating the request
  
   const jsonpath='Test Data/PUTreq.json'
   const putjson=JSON.parse(fs.readFileSync(jsonpath,'utf-8'))

   const putresponse=await request.put(`/booking/${Bookingid}`,
    {
    headers:{cookie:`token=${tokenid}`},
    data:putjson
   })

   expect(putresponse.ok()).toBeTruthy()
   expect(putresponse.status()).toBe(200)

   const putrespnse=await putresponse.json()
   console.log("updated response",putrespnse)

})