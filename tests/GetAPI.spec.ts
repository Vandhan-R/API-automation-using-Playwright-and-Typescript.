import {test,expect} from '@playwright/test'

test('sending request using path parameter',async ({request})=>{

const pathid='123'
const response=await request.get(`/booking/${pathid}`) // sending dynamic id
const jsonresponse= await response.json()
console.log(jsonresponse)

expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
expect(jsonresponse).toHaveProperty('firstname')
expect(jsonresponse).toHaveProperty('lastname')
expect(jsonresponse).toHaveProperty('depositpaid')

})

test('sending request using query parameter',async ({request})=>{

const FastName='Josh'
const LastName='Allen'

const response1=await request.get('/booking/',{params:{FastName,LastName}})
const jsonresponse1= await response1.json()
console.log(jsonresponse1)

expect(response1.ok()).toBeTruthy()
expect(response1.status()).toBe(200)
expect(jsonresponse1.length).toBeGreaterThan(0)

// checking all the booking id value should be number

for(const item of jsonresponse1)
{
    expect(item).toHaveProperty('bookingid')
    expect(typeof item.bookingid).toBe("number")
    expect(item.bookingid).toBeGreaterThan(0)
}
})