import React,{useEffect} from 'react';
import axios from 'axios';
import ScrollToBottom  from 'react-scroll-to-bottom';
import useScrollToTop from 'react-scroll-to-bottom'
import InfiniteScroll from "react-infinite-scroll-component";

import Message from './Message/Message';

import style from './Messages.module.css';

const Messages = ({ messages, name,setMessages ,room }) => {
  

  useEffect(() => {
    localStorage.setItem('count' , '1')
    return () => {
    }
  }, [])

  const fetchMoreData = async ()=>{
    console.log('working');
    const count  = parseInt(localStorage.getItem('count'));
    
    const result  = await axios.get(`http://localhost:5000/message/${room}/${count*10}`);
    console.log(result);
    
    localStorage.setItem('count' , count+1);

    let storedMessages = [] ;
    if(messages.length != 0)
         storedMessages = result.data.map(msg => ({user: msg.user.name, text: msg.text}));
    
         setMessages([  ...storedMessages,...messages])
   console.log("srtored nre msg",storedMessages);
  }

  const handleScroll = (e)=>{
       if(e.target.scrollTop == 0){
        fetchMoreData();
     };
  }

  return(
  <div className={style.messages} id="scrollingdiv"   onScroll={handleScroll}>
        <InfiniteScroll
         dataLength={messages.length}
        //  dataLength={3}
         inverse={true}
         next={fetchMoreData}
         hasMore={true}
         loader={<h4>Loading...</h4>}
         initialScrollY={0}
         scrollThreshold={'555px'}

       >

    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    </InfiniteScroll>

{/* <div style="height:700px;overflow:auto;">
    <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
        isReverse={true}
    > */}
    {/* <div style={{height: '100%'}} onScroll={(e)=>handleScroll(e)}> */}
    {/* {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)} */}
    {/* </InfiniteScroll>
</div> */}
     {/* </div> */}
  </div>
)};

export default Messages;

