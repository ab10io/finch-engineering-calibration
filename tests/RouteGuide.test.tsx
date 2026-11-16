import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { RouteGuide } from '../src/RouteGuide'
it('announces stale guidance without color alone', () => { render(<RouteGuide steps={[]} stale />); expect(screen.getByRole('alert')).toHaveTextContent('out of date') })
