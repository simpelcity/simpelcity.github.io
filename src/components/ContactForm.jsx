import { Form } from 'react-bootstrap'
import BSButton from '@/components/Button'

export default function ContactForm() {
  return (
    <Form action="https://formspree.io/f/xeoanybd" method="post" data-bs-theme="dark">
      <Form.Group className="mb-3">
        <Form.Control type="text" name="name" placeholder="Name *" className="border-top-0 border-start-0 border-end-0 border-2 border-dark-subtle outline-none shadow-none rounded-0 px-4 py-3 form-input" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="email" name="email" placeholder="Email *" className="border-top-0 border-start-0 border-end-0 border-2 border-dark-subtle outline-none shadow-none rounded-0 px-4 py-3 form-input" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control as="textarea" name="message" rows={6} placeholder="Your Message here... *" className="border-top-0 border-start-0 border-end-0 border-2 border-dark-subtle outline-none shadow-none rounded-0 px-4 py-3 form-input" required />
      </Form.Group>
      <BSButton type="submit" variant="outline" size="lg" classes="d-flex mx-auto column-gap-2 border-dark-subtle transition">Send</BSButton>
    </Form>
  )
}
