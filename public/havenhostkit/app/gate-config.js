/* HavenHostKit builder: access gate configuration.
   This file is the ONLY functional difference between the two builds of
   this app (see "Builds" in the web-filler-app README):
   - Hosted copy (thejoydigi.com/havenhostkit/app): enabled = true.
     Trying the builder is free; the final book download asks for the
     buyer access code (codes live in app.js, ACCESS_CODE_HASHES).
   - Packaged offline copy (inside havenhostkit-builder.zip): enabled =
     false. Buyers own it outright and it never asks for a code.
   When updating the app, copy this file last and set the flag for the
   target build. Everything else must stay identical between builds. */
window.HHK_GATE = {
  enabled: true,
  etsyShop: "https://www.etsy.com/shop/HavenHostKit"
};
