# Chapter 10: The Blue Sock Setup, Start to Finish

You have spent nine chapters learning the pieces. This chapter puts them together into one complete build, in the order you would actually do the work.

One honest note before we start. When this book was first written, Brandon ran The Blue Sock's Google Ads, and this chapter was only a blueprint, because nobody on this side had seen inside the live account. That changed on November 14, 2026. Brandon is out, you now manage the account yourself, working with Claude, and the live account was audited in full that day, read-only. So this chapter now does both jobs. It still gives you the recommended design, the blueprint this book would build from scratch. And right after this note, it gives you the live account as the audit found it, so you can lay the two side by side yourself. Wherever they differ, you have a good question to ask. Sometimes the running account is ahead of this blueprint. Sometimes the blueprint catches something worth fixing. Either way, you win.

## The live account, as audited on November 14, 2026

Here is what is actually running, from the audit. Read it slowly, because the rest of this chapter is the comparison.

The account holds four campaigns, and only one of them is truly live. The live one is a single Search campaign called "The Blue Sock - Dog Sitting - (Search w/ Geo's)," running since September 8, 2026, at 20 dollars a day on Maximize Clicks. In the thirty days before the audit it spent 392 dollars of the account's 611 dollars total, took 111 clicks, and recorded zero conversions. It is flagged Eligible (Limited), because a maximum bid limit is capping its bidding strategy. A second campaign was an experiment, a copy of the first switched to Maximize Conversions, which ran from October 21 to November 5, 2026 and ended without its result being applied. The other two are paused: a dynamic search ads campaign at 4 dollars a day that was doing partial brand duty, and a Performance Max campaign at 20 dollars a day that has not spent recently.

Structure is the first difference from the blueprint. There is no separate Boarding campaign and no separate Daycare campaign. Boarding and daycare live as two ad groups, Overnight Dog Care and Dog Daycare, inside the one live campaign, sharing one budget. And those two ad groups produced only 9 of the campaign's 111 clicks last month. The other 102 clicks came from ad groups that have since been paused or removed. The account's recent history is mostly the story of things that no longer run.

Location is half right. The live campaign targets eight cities: Irvine, Costa Mesa, Santa Ana, and San Juan Capistrano, where your sitters are, plus Lake Forest, Mission Viejo, and Tustin, where no sitter hosts today, plus Wildomar, where Trudy hosts at the roster's edge. Nothing is excluded. The good news is real: the location option is Presence, people in or regularly in the targeted locations, exactly as this blueprint insists. The networks are also right. Google Search only, with Search partners and the Display Network both off.

The ads themselves are decent. The two live responsive search ads point at county pages, the boarding page and the daycare page for Orange County, with ad strengths of Good and Excellent, and no ad in the account is disapproved. The assets are where the account thins out. There is no call asset anywhere, so the business phone number, 714-329-4534, appears on no ad, even though call reporting is switched on. The location asset exists, flowing from the linked Google Business Profile, but it recorded zero impressions last month. The five sitelinks point at story, badge, and tips pages rather than at Boarding, Daycare, and Reviews. The callouts are warm and generic, with no ratings, no review counts, and no proof. The structured snippet uses the header Amenities where this blueprint uses Services.

And then there is the counting, which is the audit's most important finding, important enough that Chapter 9 now carries it as a warning. The account holds many primary conversion actions at once: Booking Paid, Booking Request, Booking Complete, Submit lead form, calls, directions, and more. The headline one, Booking Paid, has an inactive tag and reads zero. Booking Request shows two conversions in one report and zero in the campaign columns, with a value of one dollar each, which is a placeholder, not revenue. The live campaign does not even optimize toward either of them. Its own goal is set to Submit lead forms, which also has no recent conversions. Google's own summary says it plainly: one tag inactive, eight actions with no recent conversions, and zero actions recording conversions. In plain words, the account spent 611 dollars last month and cannot prove what it bought. An experiment even ran Maximize Conversions for two weeks against this counting, which means it was steering by instruments that were not switched on.

Two smaller notes complete the picture. Billing has no backup payment method, the exact quiet failure this chapter warns about before a holiday rush. And the competition is not standing still: Google reports Rover holding about 40 percent of search impression share in the last week, and on the keyword "dog home boarding," your share fell from 38 percent to 22 percent while Rover held about 44 percent.

None of this is a disaster. The bones are sound: one account, the right networks, Presence targeting, a sane daily budget, working ads. What the account needs is the blueprint applied in the blueprint's own order. Counting first, then the phone, then the map, then the structure. That is the work the rest of this chapter now describes, and as of November 14, 2026, it is your work, with this book open beside you.

## Step one: the account itself

Everything lives in one Google Ads account for thebluesock.com. One account, not several. A small business that splits its history across multiple accounts splits its learning too, and Google's automated bidding learns from the account's own record of what worked.

Set the basics once and check them twice. Time zone set to Pacific Time, so reports line up with your actual days in Irvine. Currency in US dollars. Billing in order, with alerts on, so a paused card never silently stops your ads during a holiday rush.

Then link the two neighbors that matter. Link the Google Business Profile, because that link is what powers location assets later in this chapter, and it makes sure the address, phone number, and hours in your ads match what Google Maps already shows. The public phone number for the business is 714-329-4534, and that same number should appear everywhere a customer might see it. Consistency is a small trust signal, and trust is your whole product.

Turn off the helpful sounding defaults that cost small advertisers money. In each Search campaign, the Display Network stays off, because a boarding search budget should buy searchers, not banners scattered across the web. Search partners can stay or go, but watch them separately if they stay. And leave auto-applied recommendations off. Google will suggest changes every week. Some are fine. None of them should apply themselves while nobody is watching.

## Step two: three campaigns, three jobs

You learned in Chapter 3 that a campaign exists when a setting at campaign level needs to differ, above all budget and location. The Blue Sock build has three campaigns.

The Boarding campaign is the flagship. Overnight stays are the highest value service, the one with the clearest deadline, and the one most searches are about. It gets the largest share of the budget.

The Daycare campaign is second. Daycare is a smaller ticket per visit, daycare from 42 dollars a day, but it repeats. A happy daycare customer comes back every week and often becomes a boarding customer later. It gets its own campaign because its budget, its rhythm, and its landing pages differ from boarding.

The Brand campaign is the small third one, and here it gets only a paragraph, because Chapter 12 gives it the full treatment. It bids on your own name, searches like "the blue sock" and "blue sock dog boarding." It costs very little, because nobody can outrank you on your own name for long, and it protects you from a competitor buying the top spot on the search you earned. Give it a tiny budget and forget about it until Chapter 12.

That is all. Three campaigns. Not one per city, not one per sitter. A small budget split ten ways teaches Google nothing, because no single campaign gathers enough clicks and booking requests for Smart Bidding to learn from. Cities and needs live one level down, in ad groups, where they belong.

## Step three: location, the setting that protects everything else

Inside both main campaigns, set location targeting to the cities where a sitter actually hosts: Irvine, Costa Mesa, Santa Ana, and San Juan Capistrano. Wildomar, where Trudy hosts at the roster's edge, can be included in the boarding campaign with eyes open, knowing it is farther away and lower volume.

Then make the single most important location choice in the whole build. In the advanced location options, choose Presence, people in or regularly in your targeted locations. Do not accept the default, Presence or Interest. The default lets your ad show to someone across the country who once searched for Irvine. That person will never book a sitter in Irvine. Presence only. That one setting quietly saves money every single day.

Add exclusions on day one too. Exclude the cities where The Blue Sock has readers but no sitters: Anaheim, Fullerton, Huntington Beach, Newport Beach, Tustin, Mission Viejo, and Laguna. Your own blog writes helpful guides for some of those cities, which is fine for free search traffic. It is a leak in paid traffic. A click from a loving dog parent in Anaheim, where no sitter can take the dog, is money spent on a booking that cannot happen. Exclude first, and revisit only when a sitter signs up there. That revisit is a Chapter 12 story.

Notice what this does to "near me." You do not need to buy the words "near me" as your main strategy. When someone in Irvine searches "dog boarding near me," Google already knows where they are. Your Presence setting decides who may see the ad, and your location decides the rest. The searcher says "near me," your settings prove you actually are.

## Step four: ad groups by city and by need

Inside the Boarding campaign, build ad groups along two seams: where the dog parent is, and what the dog needs.

Start with Irvine, your deepest bench, three sitters strong. An Irvine Boarding ad group. Then a Costa Mesa Boarding ad group, where McKenna hosts. Then a Santa Ana Boarding ad group, where Olivia hosts. Then a San Juan Capistrano Boarding ad group, where Mariia and Nataliya host.

Then add the need based ad groups, which cut across the map. A Puppy Boarding ad group, because a first boarding for a young dog is its own anxious search, and McKenna is especially good with puppies. A Senior Dog Boarding ad group, because an older dog's owner searches differently, worries differently, and matches beautifully with Jennifer and David in Irvine and with Mariia and Nataliya down south. And a Solo Boarding ad group built around Olivia in Santa Ana: one dog family at a time, no other dogs in the home, at her premium rate of 89 dollars a night. For the owner of a nervous dog, that ad group is not a nice extra. It is the whole answer.

The Daycare campaign mirrors the shape, but smaller, because daycare is a shorter drive decision and the roster for it is thinner. An Irvine Daycare ad group first. A Costa Mesa Daycare ad group around McKenna, daycare at 54 dollars a day. A San Juan Capistrano Daycare ad group around Mariia and Nataliya, where daycare starts at 42 dollars a day, the lowest daycare price on the roster. If a city or service has no capacity behind it, it gets no ad group. An ad group is a promise. Never build one you cannot keep.

## Step five: the starter keyword lists

Keywords go in as phrase match and exact match to start, the tighter nets from Chapter 4. Broad match joins later, once tracking is proven and the negative list from Chapter 11 exists to guard it. Read these lists aloud and notice the pattern: a service word, plus a city word, plus sometimes a need word. That pattern is the whole keyword strategy for a local business.

For Irvine Boarding, the starter list sounds like this: dog boarding irvine. Boarding irvine. Dog boarding in irvine. Pet boarding irvine. Overnight dog care irvine. Dog sitter irvine, included because many owners use the word sitter for an overnight stay, and your ads and pages make the in-home offer clear.

For the other boarding cities, swap the city and keep the shape: dog boarding costa mesa. Dog boarding santa ana. Dog boarding san juan capistrano. Each list is short, and short is correct at the start.

For the need ad groups, the need word leads: puppy boarding. Puppy boarding irvine. First time dog boarding. Senior dog boarding. Senior dog care irvine. Solo dog boarding. Dog boarding one dog at a time. Dog boarding for anxious dogs.

A word about "dog boarding near me." You will add a small handful of near me phrases, because people plainly type them. But understand that location does the heavy lifting, as you set up in step three. The same goes for spelling and plurals: Google's positive keywords expand to close variants on their own, so dog boarding and dog boardings are one job, handled. Save your list keeping energy for negative keywords, where, as Chapter 11 will show, no such favor exists.

Daycare keywords follow the same music: doggy daycare irvine. Dog daycare irvine. Dog day care costa mesa. Puppy daycare. Doggy daycare san juan capistrano. Daycare is a habit purchase, so these keywords lean on the city even harder. Nobody drives forty minutes to daycare.

## Step six: the first ads, written out in full

Chapter 6 taught the shape: a responsive search ad is a set of up to fifteen headlines, each thirty characters or fewer, and up to four descriptions, each ninety characters or fewer, and Google mixes them per search. Here is the Irvine Boarding ad, complete, exactly as you would type it in.

The headlines: Dog Boarding in Irvine. Boarding From $55 a Night. 5.0 Stars, 49 Reviews. Sleeps in a Real Home. Small, Calm, One-on-One. Meet Your Sitter First. Trusted Irvine Sitters. No Kennels, Just Homes. Replies in Under 2 Hours. Book a Meet and Greet. Overnight Stays in Irvine. The Blue Sock Dog Boarding.

Read that set again and notice the jobs being done. Two headlines carry the keyword, so the ad echoes the search. Several carry proof: five point zero stars, forty-nine reviews, replies in under two hours on most requests. Several carry the feeling of the product: a real home, no kennels, meet your sitter first. And the price floor is honest, because boarding across the roster runs from 55 to 89 dollars a night, so "from $55" promises only what Trudy's rate already makes true.

The descriptions, four of them: Overnight stays in a real Irvine home, not a kennel. Meet your sitter before you book. Five-star local sitters, one-on-one care, and replies in under two hours on most requests. Boarding from $55 a night. Small, calm homes matched to your dog's needs and routine. Going away? Leave your dog with a trusted neighbor who treats them like family.

The display path under the ad reads thebluesock.com, then Boarding, then Irvine, and the final link goes to the boarding page, never the homepage. A person who searched boarding in Irvine should land somewhere that says boarding and Irvine back to them in the first screen.

Now the Irvine Daycare ad, also in full. Headlines: Doggy Daycare in Irvine. Daycare From $42 a Day. Daytime Care in a Home. Play, Naps and One-on-One. While You Work, They Play. Book a Trial Day First. Puppies and Social Dogs. Drop Off Happy, Pick Up Tired. 5.0 Stars, 49 Reviews. Replies in Under 2 Hours. The Blue Sock Daycare. Trusted Local Sitters.

Its descriptions: Daytime care in a real home while you work. Play, rest, and one-on-one attention all day. Daycare from $42 a day with trusted local sitters. Book a trial day and meet your sitter. Five-star rated by dog parents. Small groups, calm homes, and updates during the day. Drop off in the morning, pick up a happy, tired dog. Trial day available for new pups.

Same discipline, different music. Boarding ads speak to a trip and a worry. Daycare ads speak to a workday and a routine, and they push the trial day, because daycare at The Blue Sock really does begin with a trial session and a meet-and-greet after a request is accepted. The ad promises the process the site actually runs. That match, ad to landing page to real process, is what Quality Score keeps trying to measure.

Write a second ad in each ad group once the first is running, with fresh angles, and let Google rotate them. Two good ads per ad group is the working standard. Do not pin headlines at the start. Pinning feels like control, but it starves the mixing you are paying to learn from. If anything ever must be pinned, it belongs in the first headline position, the one that always shows.

## Step seven: assets, the free furniture

Assets cost nothing to add, and you pay only if someone clicks a clickable one. Set the universal ones at account level so every campaign inherits them.

The call asset carries 714-329-4534, scheduled to the hours the site promises, 7 in the morning to 9 at night daily, so a paid call never lands in an empty room. The location asset flows in from the linked Google Business Profile, so your ad can show a map pin and a distance on a phone, the details that turn "near me" into "right there."

Sitelinks add four doors under the ad, each to its own page: Boarding. Daycare. Meet Our Sitters. Reviews. Never send all four to the homepage. Callouts add the short, non-clickable proof phrases: In-Home Care. 5.0 Rated. Replies in Under 2 Hours. One-on-One Attention. A structured snippet, under the header Services, lists only what you truly sell: Dog Boarding, Doggy Daycare. Not grooming. Not walking. If a service is not on that list on the real site, it is not in the snippet.

Add image assets too, real photos of real sitters and real dogs in real homes. For a trust business, a genuine photo beats a polished stock dog every time.

## Step eight: starting bidding and a labeled example budget

Chapter 8 gave the logic, so here it is applied. Both main campaigns start on Maximize Clicks, with a maximum cost per click cap. The cap matters. Without it, Maximize Clicks can chase expensive clicks in its enthusiasm. As a labeled example, a cap of 6 dollars is a sensible starting leash: comfortably above the national pet category average of about 4 dollars a click, so you are not strangling the learning, and firmly below the prices a bidding war could reach. Those national figures are estimates from industry benchmark reports, not a promise about Irvine.

Now the budget, also a labeled example. Your real one, from the November 14, 2026 audit, is simpler and smaller: 20 dollars a day on the one live campaign, about 600 dollars a month, all in one pot shared by boarding and daycare. Say instead the total is 1,500 dollars a month, split the blueprint way. Google thinks in daily budgets, and a month divides by about 30.4, so 1,500 dollars a month is about 49 dollars a day. Split it by value: about 29 dollars a day to Boarding, roughly 880 dollars a month. About 15 dollars a day to Daycare, roughly 455 dollars a month. About 5 dollars a day to Brand, roughly 150 dollars a month.

Two budget facts to hold calmly. On a busy day a campaign may spend up to twice its daily budget, and that is normal, not a billing error. Across the month it will not exceed the daily budget times 30.4. And expect the first weeks to look inefficient. You are not buying bookings yet. You are buying the information that makes bookings cheap later.

## Step nine: the conversion tracking checklist

Chapter 9 built this, and nothing in this chapter outranks it, so run the checklist before a single dollar spends. One: the booking request is the primary conversion, counted once per click, firing on the confirmation after a request is submitted, and nowhere else. Two: phone calls count too, both calls from ads and calls from the website after an ad click, with a minimum length of 60 seconds, so a wrong number never poses as a lead. Three: micro events like page views and directions clicks are secondary, observed but never bid toward. Four: place a real test request and a real test call, and watch both appear in the conversions report. Five: confirm there is no double counting, the classic bug being a tag that fires on every page load. Six: recheck all of it after any website change, forever.

If any item fails, the campaigns wait. Smart Bidding flying on bad tracking does not make small mistakes. It makes confident, expensive ones.

## The first ninety days, in three acts

Act one, days 1 to 14: learning. Clicks arrive, costs wobble, and the campaigns sit in a learning state while Google tests which searches and ad mixes respond. Your job in act one is restraint and verification. Check that ads show in the right cities. Check that tracking records the test bookings and the real ones. Read the search terms report for anything alarming. Change almost nothing. Every structural change restarts part of the learning, so patience here is a tactic, not a personality trait.

Act two, days 15 to 45: first patterns and cleanup. Now the search terms report starts telling the truth. You will see which phrases bring real dog parents and which bring job seekers, bargain hunters, and people in cities you excluded in spirit but not yet in the list. This is where the weekly routine of Chapter 11 begins: negatives added, obvious losers paused, the solo and senior angles watched closely, because niche ad groups often show their quality early. Expect the cost per click to settle and the first real booking requests to form a pattern by city. Irvine should lead. If it does not, that itself is information.

Act three, days 46 to 90: the switch and the first real judgments. Once booking requests are arriving steadily and tracking is trusted, move the main campaigns from Maximize Clicks to Maximize Conversions, the change Chapter 8 prepared you for. Give the switch its own learning window and judge it on weeks, not days. By day 90 you can make the first honest calls: which cities earn more budget, which ad groups earn a second ad, which ones earn a pause, and what a booking request actually costs you.

## What success looks like at day ninety

Make it checkable, in numbers you can read off the account, still using our labeled example budget so nobody mistakes illustration for fact.

Spend: the account spends most of its roughly 1,500 dollar example month, neither starved nor wildly over. Clicks: at a cost per click somewhere in the 3 to 6 dollar range, that budget buys roughly 250 to 500 clicks a month, against a national pet category estimate of about 4 dollars a click. Booking requests: if your cost per booking request lands somewhere between 40 and 60 dollars in your first quarter, you are in a healthy beginner band, with the national cost per lead estimate for the pet category, about 31.50 dollars, as the horizon you grow toward rather than the bar you must clear on day one. Geography: at least 95 out of every 100 clicks come from cities with sitters. Cleanliness: the last search terms review shows no spend on jobs, free care, or services you do not sell. And the judgment test: you can say, in one sentence each, what boarding costs you per request, what daycare costs you per request, and which city you would fund next.

Hit most of that, and the setup has done its job. Not perfection. A clean, learning account, pointed at the right cities, paying for the right words, counting the right thing.

## Play It: Your Move

It is day 3 of your brand new account. A friendly dashboard suggestion appears: turn on broad match everywhere and let the campaigns reach neighboring cities automatically, to "unlock more volume." The account has spent 60 dollars so far and recorded two booking requests.

A. Accept it. More volume sounds like more bookings.
B. Decline it, and keep phrase and exact match, Presence targeting, and your city list exactly as built.
C. Accept the broad keywords, but only in Irvine, and leave locations alone.

What happens with each: With A, the next week brings clicks from Anaheim, from a man searching for a dog grooming job, and from someone who typed "free dog boarding." In our labeled example, about 200 dollars of the month goes to people who can never book, and the two real requests get lost in the noise. Volume arrived. Value did not. With C, you do better, but broad match in week one still wanders into job and do-it-yourself searches before your negative list exists to catch them, and it muddies the clean learning you were buying. With B, the account stays narrow and a little quiet, and by day 45 its data is clean enough to trust. The lesson: in the first ninety days, reach is not the prize. Clean signal is. Broad match has its season, and it comes after tracking, negatives, and patterns, not before them.

## The Short Version

One account, three campaigns: Boarding, Daycare, and a tiny Brand campaign.
Ad groups follow cities with sitters, plus puppy, senior, and solo needs.
Start on phrase and exact match, Presence only, with Maximize Clicks under a cap.
Count the booking request first, the 60-second call second, and test both before spending.
Ninety days: learn, clean up, then switch to conversions and judge with real numbers.
