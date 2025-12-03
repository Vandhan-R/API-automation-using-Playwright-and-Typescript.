import {test,expect} from'@playwright/test'
import fs from 'fs'

test('sending POST request using jason file',async ({request})=> {
    
// read the json file
const jsondata='Test Data/POSTreq.json' // getting the json path 
 const postjson=JSON.parse(fs.readFileSync(jsondata,'utf-8'))

  const postresponse= await request.post('/booking',{data:postjson})
  //console.log(postresponse)

  // validating only json body
  const jsonbody=await postresponse.json()
  console.log(jsonbody)
 
  //validating the response code
  expect(postresponse.ok()).toBeTruthy()
  expect(postresponse.status()).toBe(200)

  //validate json response 
expect(jsonbody).toHaveProperty('bookingid')
expect(jsonbody).toHaveProperty('booking')
expect(jsonbody).toHaveProperty('booking.additionalneeds')

//validate response structure
expect(jsonbody.booking).toMatchObject({firstname: postjson.firstname,
    lastname: postjson.lastname,
    totalprice: postjson.totalprice,
    depositpaid: postjson.depositpaid,
    bookingdates: 
    {  checkin: postjson.bookingdates.checkin, checkout: postjson.bookingdates.checkout},
    additionalneeds: postjson.additionalneeds})
    
})