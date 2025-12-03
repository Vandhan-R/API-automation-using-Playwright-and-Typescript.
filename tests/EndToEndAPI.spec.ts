//POST
//get
//create token
//put
//delete

import {test,expect} from '@playwright/test'
import fs from 'fs'

test('Creating a booking', async({request})=>{

    const jsondata= 'Test Data/POSTreq.json'
    const postjson= JSON.parse(fs.readFileSync(jsondata,'utf-8'))
    const postresponse= await request.post('/booking',{data:postjson})

    expect(postresponse.ok()).toBeTruthy()
    expect(postresponse.status()).toBe(200)
    const jsonresponse=await postresponse.json()
    console.log(jsonresponse)

    expect(jsonresponse).toHaveProperty('bookingid')
    expect(jsonresponse).toHaveProperty('booking')
    expect(jsonresponse).toHaveProperty('booking.additionalneeds')

    const Bookingid=jsonresponse.bookingid
    console.log("booking is==>",Bookingid)

 // getting the created booking

   const getresponse=await request.get(`/booking/${Bookingid}`)

   expect(getresponse.ok()).toBeTruthy()
   expect(getresponse.status()).toBe(200)

   const getjson=await getresponse.json()
   expect(getjson).toHaveProperty('firstname')
   expect(getjson).toHaveProperty('lastname')
   console.log(getjson)

//creating token
  
const tokenjsonpath='Test Data/Tokenreq.json'
const tokenjason=JSON.parse(fs.readFileSync(tokenjsonpath,'utf-8'))

const tokenresponse= await request.post('/auth',{data:tokenjason})
expect (tokenresponse.ok()).toBeTruthy()
expect(tokenresponse.status()).toBe(200)

const jsontoken=await tokenresponse.json()
const tokenID=jsontoken.token
console.log("token is ==>",tokenID)

// updating the token
const putpath='Test Data/PUTreq.json'
const putjson=JSON.parse(fs.readFileSync(putpath,'utf-8'))

const putresponse= await request.put(`/booking/${Bookingid}`,{
    headers:{Cookie:`token=${tokenID}`},
    data:putjson
})
expect (putresponse.ok()).toBeTruthy()
expect (putresponse.status()).toBe(200)

const putjsonresponse=await putresponse.json()
console.log('updated data ==>',putjsonresponse)

// Deleting the data

const deldata= await request.delete(`/booking/${Bookingid}`,{headers:{Cookie:`token=${tokenID}`}})
expect (deldata.status()).toBe(201)
expect(deldata.statusText()).toBe('Created')
const deletedresponse = await deldata.text()
console.log(deletedresponse)
})