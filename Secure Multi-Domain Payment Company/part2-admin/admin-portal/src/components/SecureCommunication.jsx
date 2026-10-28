import React from "react";
import AppLayout from "./AppLayout.jsx";

const TOPICS = [
  {
    title: "HTTPS",
    body:
      "Wraps HTTP traffic in an encrypted channel so requests and responses cannot be read or altered in transit. Every page and API call in a real deployment of this system would be served exclusively over HTTPS."
  },
  {
    title: "TLS",
    body:
      "The protocol underneath HTTPS. It negotiates encryption between client and server and verifies the server's identity before any data is exchanged."
  },
  {
    title: "Certificate validation",
    body:
      "Clients check that a server's TLS certificate is issued by a trusted authority, matches the domain being visited, and has not expired or been revoked, before trusting the connection."
  },
  {
    title: "Secure API communication",
    body:
      "API traffic between the admin portal, the API service, and monitoring should run over TLS, carry short-lived credentials, and reject downgrades to unencrypted transport."
  },
  {
    title: "Encryption in transit",
    body:
      "Encrypting data while it moves between systems, so intercepted network traffic reveals nothing usable, independent of how data is protected at rest."
  },
  {
    title: "HSTS",
    body:
      "HTTP Strict Transport Security tells browsers to only ever reach a domain over HTTPS, closing the window where a first request might otherwise be sent in plaintext."
  },
  {
    title: "Secure cookies",
    body:
      "Session cookies flagged Secure and HttpOnly are only sent over HTTPS and are inaccessible to page scripts, reducing exposure to network interception and cross-site scripting."
  }
];

export default function SecureCommunication() {
  return (
    <AppLayout title="Secure communication">
      <p className="text-sm text-muted mb-6 max-w-2xl">
        This local prototype runs over plain HTTP for development convenience. The concepts below
        describe how a production deployment of this architecture would protect data in transit —
        none of this is implemented as functioning TLS in this repository.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <div key={t.title} className="bg-surface border border-border rounded p-4">
            <h2 className="text-sm font-medium mb-1.5">{t.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
