import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [roomId, setRoomId] = useState('');
    useEffect(() => {
        fetch(`${process.env.API_URL}api/stream/get-room`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRoomId(() => data.roomId);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <div>
            <span>Hello, room id is: </span>
            <Link to={`${roomId}`}>{roomId}</Link>
        </div>
    )
}

export default Home
