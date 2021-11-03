import React from 'react';

export const Landing = () => {
  return (
    <>
      <h1>Planning Poker</h1>
      <form>
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Round Name:</label>
        <input type="text" name="round-name" />
        <button>CREATE</button>
      </form>
      <form>
        <label>Got a room code?</label>
        <input type="text" name="room-code-name" />
        <button>JOIN</button>
      </form>
    </>
  );
};
