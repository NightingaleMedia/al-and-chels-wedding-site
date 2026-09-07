import type { Metadata } from 'next'
import { SUPPORT_EMAIL } from '@/constants'

export const metadata: Metadata = {
  title: "Privacy Policy | Al and Chelsea's Wedding",
  description: "Privacy Policy for Al and Chelsea's Wedding website.",
}

export default function PrivacyPolicy() {
  return (
    <article className="px-6 pb-12 font-body1">
      <h1 className="mb-6 text-3xl">Privacy Policy</h1>
      <p className="mb-6">
        <strong>Effective date:</strong> September 7, 2026
      </p>

      <p className="mb-4">
        This Privacy Policy explains how Al and Chelsea&apos;s Wedding
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
        protects information submitted through this website, including the RSVP
        form and wedding-update text messages.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Information We Collect</h2>
      <p className="mb-4">
        When you use the RSVP form, we may collect your name, guest details,
        email address, phone number, RSVP responses, dietary information, and
        any other information you choose to provide. We may also receive basic
        technical information needed to operate and protect the website.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Text Message Updates</h2>
      <p className="mb-4">
        If you provide your phone number and check the optional box to receive
        wedding updates, you consent to receive recurring text messages from us
        about the wedding, such as schedule, travel, RSVP, and day-of updates.
        Consent is not required to submit an RSVP or use the website.
      </p>
      <p className="mb-4">
        Message frequency varies. Message and data rates may apply. You can opt
        out at any time by replying <strong>STOP</strong>. For help, reply
        <strong> HELP</strong>. After you send STOP, you may receive one final
        confirmation message and will no longer receive wedding-update texts
        unless you opt in again.
      </p>
      <p className="mb-4">
        Your mobile number and SMS opt-in information will not be sold or shared
        with third parties or affiliates for their own marketing or promotional
        purposes. We may share this information with service providers,
        including Twilio, only as needed to send and manage the messages you
        requested, provide the website, or comply with the law.
      </p>

      <h2 className="mb-3 mt-8 text-xl">How We Use Information</h2>
      <p className="mb-4">
        We use information to manage RSVPs, communicate with guests, send
        requested wedding updates, respond to questions, maintain and secure the
        website, and meet legal obligations. We do not use RSVP or SMS
        information for unrelated advertising.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Data Retention and Security</h2>
      <p className="mb-4">
        We retain information only for as long as reasonably necessary to manage
        the wedding, provide requested communications, resolve issues, and meet
        legal or operational requirements. We use reasonable administrative and
        technical safeguards, but no method of transmission or storage is
        completely secure.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Your Choices</h2>
      <p className="mb-4">
        You may decline to provide optional information, unsubscribe from text
        messages by replying STOP, or ask us to review, correct, or delete
        personal information we control. Some information may need to be
        retained where required by law or reasonably necessary to resolve a
        dispute.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Children&apos;s Privacy</h2>
      <p className="mb-4">
        This website is not directed to children under 13, and we do not
        knowingly collect personal information from children under 13.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy when our practices or legal requirements
        change. The updated policy will be posted on this page with a revised
        effective date.
      </p>

      <h2 className="mb-3 mt-8 text-xl">Contact Us</h2>
      <p>
        Questions or privacy requests can be sent to{' '}
        <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </article>
  )
}
