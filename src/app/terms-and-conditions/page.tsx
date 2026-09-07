import type { Metadata } from 'next'
import { SUPPORT_EMAIL } from '@/constants'

export const metadata: Metadata = {
  title: "Terms and Conditions | Al and Chelsea's Wedding",
  description: "Terms and Conditions for Al and Chelsea's Wedding website.",
}

export default function TermsAndConditions() {
  return (
    <article className="px-6 pb-12 font-body1">
      <h1 className="mb-6 text-3xl">Terms and Conditions</h1>
      <p className="mb-6">
        <strong>Effective date:</strong> September 7, 2026
      </p>

      <p className="mb-4">
        These Terms and Conditions govern your use of the Al and Chelsea&apos;s
        Wedding website. By using this website, you agree to these terms. If you
        do not agree, please do not use the website.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Use of the Website</h2>
      <p className="mb-4">
        This website is provided for wedding information, guest communication,
        RSVP submission, and related personal use. You agree to use it lawfully
        and not to interfere with its operation, attempt unauthorized access,
        submit malicious content, or use information from the website for spam
        or unsolicited marketing.
      </p>

      <h2 className="mb-3 mt-8 text-xl">RSVP Information</h2>
      <p className="mb-4">
        You are responsible for providing accurate and current information in
        the RSVP form and for having permission to submit information about any
        guests you include. An RSVP submission is an indication of your
        response; it does not create a contract or guarantee that event details
        will remain unchanged.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Text Message Updates</h2>
      <p className="mb-4">
        Text-message updates are optional. By providing your phone number and
        selecting the text-update opt-in, you confirm that you are authorized to
        use that number and agree to receive wedding-related messages. Message
        frequency varies, and message and data rates may apply.
      </p>
      <p className="mb-4">
        Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for
        help. Opting out of texts does not affect your RSVP or ability to use
        the website. Our text-message practices are also described in our{' '}
        <a className="underline" href="/privacy-policy">
          Privacy Policy
        </a>
        .
      </p>

      <h2 className="mb-3 mt-8 text-xl">Event Details and Calendar Links</h2>
      <p className="mb-4">
        Event dates, times, locations, schedules, and other details may change.
        Calendar links and downloadable calendar files are provided for
        convenience and may not update automatically. Please rely on the latest
        information communicated by us before making travel or other
        arrangements.
      </p>

      <h2 className="mb-3 mt-8 text-xl">User Submissions</h2>
      <p className="mb-4">
        If you submit a story, photograph, message, or other material, you
        represent that you have the right to share it and that it does not
        violate another person&apos;s rights. You give us permission to use,
        display, and reproduce that material for this wedding website and
        related wedding communications. We may remove submitted material at any
        time.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Third-Party Services</h2>
      <p className="mb-4">
        The website may use or link to third-party services, including hosting,
        RSVP processing, text messaging, and calendar providers. Those services
        have their own terms and policies, and we are not responsible for their
        availability, content, or practices.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Intellectual Property</h2>
      <p className="mb-4">
        Unless otherwise noted, the website and its original text, design, and
        media belong to us or are used with permission. You may view the website
        for personal, non-commercial use, but you may not copy, republish,
        modify, or commercially exploit its content without written permission.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Availability and Disclaimers</h2>
      <p className="mb-4">
        We try to keep the website accurate and available, but we do not
        guarantee that it will always be uninterrupted, complete, or error-free.
        The website and its content are provided on an &quot;as is&quot; and
        &quot;as available&quot; basis to the extent permitted by law.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Changes and Termination</h2>
      <p className="mb-4">
        We may update these terms, change website content, or suspend access at
        any time. The updated terms will be posted on this page with a revised
        effective date. Your continued use of the website after an update means
        you accept the revised terms.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Contact Us</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </article>
  )
}
