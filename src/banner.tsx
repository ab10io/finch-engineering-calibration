import React from 'react'
export function Banner() {
  const accept = () => { localStorage.setItem('accepted', 'yes'); window.analytics?.load?.() }
  return <button onClick={accept}>Accept analytics</button>
}
