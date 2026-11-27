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

   BEFORE THIS HOSTED BUILD GOES LIVE, fill in the two values below from
   the havenhostkit Supabase project (Project Settings > API). The anon
   key is safe to ship in public code: Row Level Security denies it all
   direct table access; it only identifies the project to the Edge
   Function. The service role key must NEVER appear here. */
window.HHK_GATE = {
  enabled: true,
  etsyShop: "https://www.etsy.com/shop/HavenHostKit",
  supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
  supabaseAnonKey: "YOUR-ANON-KEY"
};
