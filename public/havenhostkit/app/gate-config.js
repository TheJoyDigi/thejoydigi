/* HavenHostKit builder: access gate configuration.
   This file is the ONLY functional difference between the two builds of
   this app (see "Builds" in the web-filler-app README):
   - Hosted copy (thejoydigi.com/havenhostkit/app): enabled = true.
     Trying the builder is free; the final book download asks for the
     buyer's unique access code, validated server-side by the
     havenhostkit Supabase project (validate-code Edge Function).
   - Packaged offline copy (inside havenhostkit-builder.zip): enabled =
     false. Buyers own it outright and it never asks for a code.
   When updating the app, copy this file last and set the flag for the
   target build. Everything else must stay identical between builds.

   The two values below are from the havenhostkit Supabase project
   (Project Settings > API), filled in 2026-11-27. The anon
   key is safe to ship in public code: Row Level Security denies it all
   direct table access; it only identifies the project to the Edge
   Function. The service role key must NEVER appear here. */
window.HHK_GATE = {
  enabled: true,
  etsyShop: "https://www.etsy.com/shop/HavenHostKit",
  supabaseUrl: "https://qfzbfuvjskwqttodongu.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmemJmdXZqc2t3cXR0b2Rvbmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU4MTM5MzIsImV4cCI6MjExMTM4OTkzMn0.I3dvwQUZuRWoOf9AN0D_L7xJl3W22Any1XOJNrFc4Dk"
};
