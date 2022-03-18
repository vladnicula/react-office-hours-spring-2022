// __tests__/snapshot.js

import { render, screen } from '@testing-library/react'
import { Input } from '../src/elements/Input/Input'

// it('sets id to input corectly', () => {
//   const { container } = render(<Input id={'myField'} />)
//   expect(container).toMatchSnapshot()
// })

it('sets type to password correctly', () => {
  render(<Input type={'password'} id={'myField'} />)
  const inputElement = screen.getByTestId(`input-myField`)
  expect(inputElement).toHaveAttribute("type", "password")
})
