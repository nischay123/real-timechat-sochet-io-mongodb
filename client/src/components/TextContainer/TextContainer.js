import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import style from  './TextContainer.module.css';

const TextContainer = ({ users }) => (
  <div className={style.textContainer}>
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className={style.activeContainer}>
              {console.log(users)}
              <h2>
                {users.map(({name}) => (
                  <div key={name} className={style.activeItem}>
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;