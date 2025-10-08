"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    toast.error("Email signups not yet available")
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="w-full px-4 py -4 md:px-6 lg:px-8 ">
      <div className="max-w-9xl mx-auto">
        <div className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden bg-muted">
          <div className="relative h-64 md:h-auto min-h-[400px] md:flex-1">
            <Image
              src="/newsletter.webp"
              alt="Fashion lifestyle"
              fill
              className="object-cover"
            />
          </div>

          {/*Text takenm from eastlink.ca*/}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-foreground to-foreground/90 md:flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-background mb-4">
              Get the latest offers delivered to your inbox!
            </h2>
            <p className="text-sm md:text-md text-background/80 mb-8">Be the first to know about our best offers!</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address*"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-background/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-background text-foreground hover:bg-background/90 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
