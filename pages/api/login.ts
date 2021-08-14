import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const data = JSON.parse(req.body)
        const user = await fetch('http://127.0.0.1:8001/api/method/login', {
            method: req.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usr: data.email,
                pwd: data.password,
            })
        })
            .then(response => response.json())
            .then(response => {
                return res.status(200).json(response)
            })



    } catch (err) {
        res.status(400).json({ message: 'something went wrong' + err })
    }
}