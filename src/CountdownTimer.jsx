import React from "react";
import { useTimer } from "react-timer-hook";

function CountdownTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("Timer expired"),
    });

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
      <div className="text-xs md:text-base">
        {"Dont forget today's time ends in"}
      </div>
      <div className="font-thin text-2xl md:text-5xl">
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
}

export default CountdownTimer;
