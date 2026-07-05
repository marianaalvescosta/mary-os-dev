---
slug: calendly-booking-detection
title: "Calendly Booking Detection"
role: "n8n · Calendly · Monday.com"
yearTop: "Jun 2026"
yearBot: "Automation"
tags: ["n8n", "Calendly", "Monday.com"]
order: 6
---

Built an automation that detects when a lead books a call and updates everything downstream — their pipeline status in Monday.com and the message sequences they're enrolled in. The detection passes each lead's ID through the Calendly link as a UTM parameter, with reliable fallbacks: if no ID comes through, it matches the booking by email or phone number, and a booking that arrives with no tracking at all gets added to the board automatically. If no match can be found anywhere, it sends a warning that the lead isn't on the leads board. Before this, a booking didn't show up in the pipeline on its own.
