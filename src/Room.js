import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';


import './room.css';

const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ],
}

const mediaConstraints = {
    audio: false,
    video: { width: 1280, height: 720 },
}

function Room() {
    const socket = io(process.env.API_URL);
    const { roomId } = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const [localStream, setLocalStreaming] = useState(undefined);
    const [remoteStream, setRemoteStreaming] = useState(undefined);
    const [isRoomCreator, setIsRoomCreator] = useState(false);
    const [rtcPeerConnection, setRtcPeerConnection] = useState(undefined);

    useEffect(() => {
        socket.on('room_created', async () => {
            console.log('Socket event callback: room_created')
          
            await setLocalStream(mediaConstraints)
            setIsRoomCreator(true);
        });

        socket.on('room_joined', async () => {
            console.log('Socket event callback: room_joined')
          
            await setLocalStream(mediaConstraints)
            socket.emit('start_call', roomId)
        });

        socket.emit('join', roomId);
    }, []);
    useEffect(() => {

        console.log('ovde sam');

        socket.on('full_room', () => {
            console.log('Socket event callback: full_room')
          
            alert('The room is full, please try another one')
        });

        socket.on('start_call', async () => {
            console.log('Socket event callback: start_call')
          
            if (isRoomCreator) {
              setRtcPeerConnection(new RTCPeerConnection(iceServers))
              addLocalTracks(rtcPeerConnection)
              rtcPeerConnection.ontrack = setRemoteStream
              rtcPeerConnection.onicecandidate = sendIceCandidate
              await createOffer(rtcPeerConnection)
            }
          })
          
          socket.on('webrtc_offer', async (event) => {
            console.log('Socket event callback: webrtc_offer')
          
            if (!isRoomCreator) {
                setRtcPeerConnection(new RTCPeerConnection(iceServers))
              addLocalTracks(rtcPeerConnection)
              rtcPeerConnection.ontrack = setRemoteStream
              rtcPeerConnection.onicecandidate = sendIceCandidate
              rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
              await createAnswer(rtcPeerConnection)
            }
          })

          socket.on('webrtc_answer', (event) => {
            console.log('Socket event callback: webrtc_answer')
          
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
          })
          
          socket.on('webrtc_ice_candidate', (event) => {
            console.log('Socket event callback: webrtc_ice_candidate')
          
            // ICE candidate configuration.
            var candidate = new RTCIceCandidate({
              sdpMLineIndex: event.label,
              candidate: event.candidate,
            })
            rtcPeerConnection.addIceCandidate(candidate)
          })
    }, [socket]);

 

    // console.log(roomId);
    return (
        <div id="video-chat-container" className="video-position">
            <video id="local-video" ref={localVideoRef} autoPlay="autoplay"></video>
            <video id="remote-video" ref={remoteVideoRef} autoPlay="autoplay"></video>
        </div>
    );

    // Callback functions

    // function joinRoom(room, socket) {
    //     if (room === '') {
    //       alert('Please type a room ID')
    //     } else {
    //     //   roomId = room
    //       socket.emit('join', roomId)
    //     //   showVideoConference()
    //     }
    //   }
      
      function showVideoConference() {
        roomSelectionContainer.style = 'display: none'
        videoChatContainer.style = 'display: block'
      }

      async function setLocalStream(mediaConstraints) {
        let stream
        try {
          stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        } catch (error) {
          console.error('Could not get user media', error)
        }
      
        setLocalStreaming(stream);
        localVideoRef.current.srcObject = stream;
        // setLocalSourceObject(stream);
        // localVideoComponent.srcObject = stream
      }

      function addLocalTracks(rtcPeerConnection) {
        localStream.getTracks().forEach((track) => {
          rtcPeerConnection.addTrack(track, localStream)
        })
      }
      
      async function createOffer(rtcPeerConnection) {
        let sessionDescription
        try {
          sessionDescription = await rtcPeerConnection.createOffer()
          rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch (error) {
          console.error(error)
        }
      
        socket.emit('webrtc_offer', {
          type: 'webrtc_offer',
          sdp: sessionDescription,
          roomId,
        })
      }
      
      async function createAnswer(rtcPeerConnection) {
        let sessionDescription
        try {
          sessionDescription = await rtcPeerConnection.createAnswer()
          rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch (error) {
          console.error(error)
        }
      
        socket.emit('webrtc_answer', {
          type: 'webrtc_answer',
          sdp: sessionDescription,
          roomId,
        })
      }
      
      function setRemoteStream(event) {
        // remoteSourceObject(event.streams[0])
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStreaming(event.stream);
      }
      
      function sendIceCandidate(event) {
        if (event.candidate) {
          socket.emit('webrtc_ice_candidate', {
            roomId,
            label: event.candidate.sdpMLineIndex,
            candidate: event.candidate.candidate,
          })
        }
      }
}

export default Room
