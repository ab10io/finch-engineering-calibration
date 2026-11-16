import React from 'react'
export function RouteGuide({ steps, stale = false }) {
 return <main aria-labelledby="route-title"><h1 id="route-title">Route instructions</h1>{stale && <p role="alert">Updates may be out of date. Call station assistance.</p>}<ol>{steps.map((step) => <li key={step.id}>{step.text}</li>)}</ol></main>
}
