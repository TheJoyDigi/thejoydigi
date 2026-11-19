# Chapter 9: Counting What Counts: Conversion Tracking

Almost none of those numbers answer the only question that matters. Did anyone ask to book a dog?

This chapter is about counting the answer to that question, and only that question, with total honesty. It is the least glamorous chapter in this book and, dollar for dollar, the most valuable. Chapter 8 showed you the moment a campaign switches from hunting clicks to hunting bookings. That switch is only as good as the counting underneath it. This chapter is the counting.

## A conversion is the action that matters

A conversion is not a visit. A conversion is not a view, or a tap, or a minute spent reading about your sitters, nice as all of those are.

A conversion is the action that matters. The moment a stranger takes the step that can turn into revenue.

For The Blue Sock, there are two actions that clear that bar, and this book treats them as the two primary conversions. Primary is Google's own word for the actions your bidding hunts for, and the distinction matters, as you will see in a moment.

The first is a submitted booking request. The second is a phone call of real length.

Everything else is a signal, not a goal. Signals are worth watching. Goals are worth paying for. Confusing the two is how small businesses teach Google to buy the wrong thing, efficiently, at scale.

Here is how the live account is set up as of November 19, 2026. Booking Request is primary, and it is the number in the Conversions column. Calls from ads is also primary, but it cannot fire until the account has a call asset, which Chapter 7 left as the owner's decision. Booking Paid is secondary, so it sits outside the Conversions column. Later sections explain each choice.

## Primary one: the submitted booking request

Picture the real booking flow on your site. A dog owner browses the sitter profiles. She finds someone who fits, maybe Jennifer and David for her calm senior dog, maybe Olivia for a dog who needs to be the only guest. She messages the sitter through the site and sends a request with her dates. Later come the meet and greet, the confirmed dates, and payment through the site checkout.

The conversion moment is the submitted request. Not the payment, which may come days later and after a human conversation. Not the profile view, which is interest. The request is the moment interest becomes intent, in writing, with dates attached.

Counting it is simple in idea. When a request is successfully submitted, the site marks the occasion, usually on a confirmation step or with a small piece of tracking code that fires once, at that exact moment. Google records one conversion, tied back to the click that brought the visitor.

On the live site, as of November 19, 2026, the Booking Request count fires on the booking success page, counts one conversion per click, and carries a placeholder value of one dollar. That dollar is a label, not revenue. It means value based bidding has nothing real to learn from yet.

Two details decide whether this count can be trusted. It must fire once, not on every page the visitor sees afterward, or one request becomes three and the reports lie with confidence. And it must fire on the real submission, not on the click of the send button, because buttons get clicked by people who then abandon the form with a required field empty. Count completed requests. Only completed requests.

## Primary two: the phone call that lasts

The Blue Sock is a phone friendly business. Your number is public, your hours are 7 in the morning to 9 at night every day, and a lot of dog owners, especially first timers handing over a beloved animal, would rather talk to a person than fill in a form.

So calls count. Not every call counts.

A wrong number counts for nothing. A hang up after four seconds counts for nothing. A caller asking if you sell puppies counts for nothing, and you do not sell puppies. The standard fix is simple and honest. Count a call as a conversion only if it lasts at least 60 seconds. A full minute is not proof of a booking, but it is strong evidence of a real conversation about a real dog.

Sixty seconds is a judgment call, not a law of nature. Some businesses use 30. Some use 90. The principle is what matters. The line should sit where real conversations live, and pocket dials do not. Pick a line, write it down, and do not move it every month, or your own history stops meaning anything.

One live caveat, as of November 19, 2026. Calls from ads is set up as a primary conversion, but with no call asset in the account it has nothing to count. A conversion that can never fire is not tracking. It is a placeholder.

Count calls from two places. Calls made straight from the ad, by tapping the call asset from Chapter 7. And calls made from the website, by a visitor who arrived through an ad and then dialed the number on the page. That second kind needs a small piece of technology, explained in plain words below, because the site has to know which calls came from ad visitors.

Miss the calls, and you blind yourself to half the story. Practitioners who audit local service accounts say it plainly. Businesses that count only forms regularly conclude that their best keywords do not work, when in truth those keywords were producing phone calls they never counted.

## Secondary signals: useful, and not goals

Below the two primaries sits a second tier, and Google gives it a name too. Secondary conversions are actions you observe but do not bid toward.

For The Blue Sock, the natural secondaries are a click for directions, the start of a chat, and a view of the sitter list by someone who arrived from an ad. Google also keeps its own hosted local actions, such as directions and website visits, and as of November 19, 2026 those stay out of the Conversions column too. Each one says something real. Directions suggest a meet and greet may be forming. A chat start is warmer than a page view. A sitter list view means the visitor got past the front door and into the heart of the offer.

Watch them. Do not promote them.

Here is why the fence between primary and secondary matters. Whatever you mark primary becomes the target for Smart Bidding, the subject of the next section. If directions clicks are primary, Google will find you more people who click for directions, including plenty who never intend to book. If chat starts are primary, Google will find you chat starters. The system does not know which action pays your sitters. You told it, with your settings. Tell it the truth.

Check the primary and secondary labels after any website change, any new tool, or any helpful suggestion applied inside the account. Labels drift. Defaults creep. The fence needs an owner, and the owner is you.

## Why Booking Paid is secondary, for now

The most important secondary in the live account is Booking Paid. It fires on the payment success page, with the real dollar amount of the stay. It is the closest thing the account has to a receipt. So why is it secondary, and Booking Request primary?

Because of volume and timing. A request is quick and fairly common. A paid booking comes later, after the sitter accepts, after the meet and greet, after the payment request. It is rarer and slower, and bidding learns from the events it can see. Chapter 8 said conversion bidding wants about 15 conversions in 30 days to work with. A campaign asked to hunt paid bookings, with a trickle of them, would starve. Requests give it more examples sooner.

The cost of this choice is real. A request is not a stay. Bidding learns which clicks lead to requests, and nothing yet tells it which requests turn into paid stays.

So here is when to revisit. Once requests flow steadily, consider sending the paid booking value back to Google, so bidding learns which requests turn into stays. There are two roads. You can promote Booking Paid to primary, watching for the delay and for the same customer counting twice. Or you can keep Booking Request primary and send the later paid event back with an offline import or with enhanced conversions for leads, covered below. Either way, that is a step for when the account has data to protect, not a first step.

## Why Smart Bidding is blind without tracking

Smart Bidding is the name for Google's automated bidding when it hunts for conversions, as in Maximize Conversions, with or without a target CPA. It works by learning. It looks at the searches, places, times, devices, and people that produced your counted conversions in the past, finds the patterns they share, and bids with those patterns in mind on every new search, in the split second the auction runs.

Notice the load bearing phrase in that description. Your counted conversions.

Smart Bidding cannot see your inbox. It cannot see the booking requests sitting in the site portal, hear the phone conversations, or watch a sitter accept a stay. It sees only what your tracking reports to it. No tracking, no conversions in its world, no matter how busy your real week was. Broken tracking is worse, because the system then learns from fiction and defends its conclusions with data.

This is why Chapter 8 insists on its order. Maximize Clicks first, while tracking is built and proven. Maximize Conversions only when requests and calls are counted accurately and arriving steadily. The switch is not a date on a calendar. It is a verdict on your counting. If the counting is honest, the switch turns your budget into a booking hunting budget. If it is fiction, the switch turns your budget into a fiction hunting budget, and it will find fiction at an impressive cost per lead.

There is a human version of the same blindness. Without tracking, your own monthly judgment is guesswork. You will know what you spent and how many clicks you bought, and you will have feelings about which weeks felt busy. Feelings are not a steering system. Counting what counts is.

## Call tracking, in plain words

How does Google know a phone call came from an ad? Two simple mechanisms cover most of it, and neither requires you to believe in magic.

For calls from the ad itself, Google can show a forwarding number in place of yours. It looks like a normal phone number to the caller, who taps it and reaches your real number, because the call is routed through. On the way past, the system notes the call, its time, and its length. Your customer notices nothing except that a person answered.

For calls from the website, the site can show a special number only to visitors who arrived from an ad, while everyone else sees your regular number. When that special number rings, the system can tie the call back to the ad visit. This is sometimes called dynamic number insertion, which is a grand name for a simple swap. Same idea, different doorway.

Two honest cautions belong here. First, keep your real number consistent everywhere else, on your profile, your pages, and your listings, because consistency helps customers and search results alike. The swapped numbers are a measuring tool, not a new identity for the business. Second, decide early whether you will record calls, and be thoughtful about it. Recordings can help train a team, but they are recordings of your neighbors. For most small businesses, counting the call, its source, and its length is enough.

## Enhanced conversions, simply and honestly

Even with good tracking, some conversions get lost. A person clicks your ad on their phone at lunch, browses on a laptop that night, and sends the request there. A browser blocks the tracking code. The thread between click and request snaps, and the conversion happens without its history.

Enhanced conversions are Google's repair kit for some of those snapped threads. When a request is submitted, the site can send Google extra information about the customer, such as an email address or phone number, after it has been scrambled by a standard one way process called hashing. Google compares the scrambled values with the ones it holds for people signed into Google accounts. If they match, the conversion can be reconnected to the earlier ad interaction.

Said more plainly, you are not sending Google a readable list of your customers. You are sending fingerprints that only match fingerprints Google already has. It recovers some conversions that privacy tools and device switching would otherwise hide, which makes your counts closer to the truth and gives Smart Bidding better lessons to learn from.

Honesty requires two footnotes. Enhanced conversions recover some losses, not all of them, and no honest person can promise a percentage before the fact. And this only works with information a customer gave you in the normal course of booking, handled under your privacy commitments. It is a measurement repair, not a license to collect anything extra. Set it up, because in 2026 it is a standard part of serious tracking, and keep your expectations calm.

Here is the honest status. As of November 19, 2026, enhanced conversions for leads is switched on in the account, and the terms are accepted. But the site sends no hashed customer data with the conversion, so it is not actually working. A switch in the account is only half the job. The other half is the website sending the scrambled email or phone with each request. Until that ships, treat this feature as planned, not live.

## Privacy and consent, for a US business

You will hear about Consent Mode v2. It is a requirement for visitors in the European Economic Area. The Blue Sock serves Orange County, so it is good practice here, not the main worry.

The rules closer to home are California's privacy laws. They matter most where you use remarketing, which shows ads to people who visited your site, and Customer Match, which uses your own customer lists. Be clear in your privacy policy about what you collect and share for advertising, and honor opt-outs. This book is not legal advice, so confirm the details with counsel before you scale either one.

As for where these stand, as of November 19, 2026, the Customer Match lists in the account serve zero on Search. Small lists often do, because Google needs enough matched people before a list serves. That means the exclusion of past customers from the campaign does nothing yet. It is harmless, but do not count on it.

## The Blue Sock funnel, as a worked example

Let us walk your real funnel, step by step.

A neighbor searches for dog boarding in Irvine. Your ad shows, because Chapter 7 did its job. She clicks. That is step one, the click, and it is the only step Google charges you for directly.

She lands on a page. Step two. Does she stay, or bounce back in seconds? If the page keeps the ad's promise, she moves to step three, viewing the sitter listings, the roster itself. She opens a profile, step four, maybe Johnny's, with his 57 reviews, or McKenna's, if her dog is reactive and needs a trainer's eye. She messages the sitter and submits a request with real dates. Step five. That is the conversion this whole book is organized around.

Now here is the honest part, and it uses a fact your own team already knows. Johnny told Steph in late October 2026 that there is a significant drop off between visitors reaching the landing page and visitors going on to view the sitter listings. Not just in ad traffic. Across organic and direct visits too. Many people arrive. Far fewer take the one step that puts a sitter in front of them.

This book will not invent a percentage for that drop off, because nobody quoted one. The lesson does not need a percentage. It needs a location. The leak is not at the ad, because people are clicking. The leak is not at the request form, because most visitors never get near it. The leak sits between arrival and the sitter list, on the landing page itself, or in the path from that page to the roster.

That kind of reading is what funnel counting is for. Each step tells you where to work. A weak click rate points at the ad and the targeting. A strong click rate with a weak sitter list rate points at the landing page. Strong profile views with weak requests point at the profiles, the prices, the availability, or the request flow.

And it hands you the sharpest landing page lesson in this book. Send people to the page that matches their search. A boarding ad should land on boarding, with boarding sitters, boarding rates from about 59 dollars a night in the ad cities, and a clear path to the roster. A daycare ad should land on daycare. Sending every ad to the homepage sounds tidy and performs badly. Your homepage must explain everything to everyone, so it speaks directly to no one. The searcher asked a specific question at 10 at night with a flight in the morning. Answer that question on the page she lands on.

Fixing a landing page leak beats buying more clicks, every time. More clicks into a leaky page are just more paid visitors leaving at the same step. Repair the step, and every future click, from every source, becomes worth more. That is value creation applied to a funnel.

## When the numbers look wrong

Tracking breaks quietly, so build the habit of checking before you believe. When the numbers look wrong, too good, too bad, or simply strange, walk this short checklist in prose before you change any strategy or budget.

First, do the real world test. Submit a test request yourself, exactly as a customer would, and make a test call the same way. Then confirm that exactly one of each appears in the reports. Not zero, which means the counting is dead or disconnected. Not two or three, which means something is double firing, the classic bug after a website change.

Second, compare the reports with the business itself. If the portal shows real requests this week and the ad reports show none, believe the portal and go hunting for the broken link. If the reports show a flood of conversions on a day the sitters heard nothing, believe the sitters.

Third, check the labels. Confirm that booking requests and calls of 60 seconds or more are still primary, that Booking Paid is still secondary unless you chose to promote it, and that page views, directions, and chat starts have not crept into the primary tier during some update or well meant optimization.

Fourth, check the call settings. Confirm the minimum call length is still where you set it, and that calls are still being counted from both the ads and the website, not just one doorway.

Fifth, ask what changed. A site redesign, a new booking tool, a moved page, a fresh plugin. Tracking rarely dies of old age. It dies in renovations. The date the numbers went strange is usually within a day or two of the date something shipped.

Run those five checks before any big decision, and you will catch most counting problems while they are still cheap. Then fix, retest with your own request and call, and only then let Smart Bidding learn from the numbers again.

## A real account, caught by its own checklist

This is not theory for you anymore. When your live account was audited on November 14, 2026, it failed this chapter's checks in almost every way an account can. Booking Paid had an inactive tag. Eight conversion actions had no recent conversions, and not one action in the account was verifiably recording. Booking Request showed two conversions in one report and zero in the campaign columns, valued at one dollar each. The live campaign was set to optimize toward yet another action, Submit lead forms. And a two week experiment had just finished running Maximize Conversions against this counting, steering hard by instruments that were never switched on. The account had spent 611 dollars in thirty days and could not prove what it bought. Those audit details were not re-pulled on November 19, so treat them as the starting picture, not today's.

Here is the picture as of November 19, 2026. Booking Request is primary and counts in Conversions. Booking Paid is secondary. Calls from ads is primary but cannot fire. Enhanced conversions for leads is on but not working. And the Conversions column reads zero while All conversions shows two booking requests. Those two arrived on November 4 and 5, 2026, and Google credited them to the old experiment campaign, which was not set to count them, so they landed in All conversions only. The live campaign itself recorded no booking requests in those thirty days. That is the first job: prove the live campaign can record one. Do the real world test from the checklist above, and check the Booking Request count against the success page. The account calendar also plans a check of the booking request count with real data around November 23, 2026.

That is why counting is chapter nine and not an appendix. When you took over the account, this checklist became job one, ahead of keywords, ahead of budgets, ahead of everything.

## Play It: Your Move

It is a Monday morning, and the report makes you smile before coffee. Over the weekend, your boarding campaign produced 41 conversions, its best weekend ever, at a cost per conversion that looks wonderful. Johnny, careful as ever, adds one detail. A website update shipped on Friday, and the thing being counted is a view of a confirmation style screen. He is not yet sure it only appears after a real request. Meanwhile, the sitter portal shows four actual booking requests from the whole weekend. In this story, the campaign is on Maximize Conversions, so Google is already learning from these numbers. What is your move?

A. Celebrate quietly and raise the budget. The system is clearly finding something that works, and the portal number will probably catch up once the sitters reply.

B. Pause the celebration, not necessarily the campaign. Mark nothing new, test the tracking yourself that morning, and have the count fixed so only a completed booking request counts. Accept that the weekend data is polluted and let the system relearn from clean numbers.

C. Switch the campaign back to counting page views on purpose, since views are plentiful, and let Smart Bidding maximize those. Plentiful conversions make the system confident, and confidence sounds like performance.

Here is what happens with each.

If you pick A, you spend real money defending a mirage. Smart Bidding takes the 41 phantom conversions as a map of your ideal customer, and it is a map of people who merely reached a page. It bids harder for more of them. In the story, two weeks of this costs you hundreds of dollars chasing page viewers, while real requests stay at their usual pace, and your history fills with lessons you will have to unlearn.

If you pick B, you lose a weekend of data and keep your steering. Your test request shows the truth within the hour. In this story the screen was appearing on an early preview step, so the count is rebuilt to fire only on a completed submission. The reports drop back to honest numbers, four requests and the calls that came with them, and Maximize Conversions relearns from reality. In the story, this boring morning saves the month, because every later decision rests on counts that match the portal.

If you pick C, you have built a machine for buying applause. Page views are cheap and endless, so the cost per conversion will look better every week while revenue stands still. In the story, the account wins awards in its own reports and the sitters notice nothing at all, which is the most expensive outcome in this book. Money out, learning poisoned, and a dashboard that lies to you with a smile.

The lesson is that a conversion is a promise the data makes to every future decision. Count only what counts, or the counting will decide for you.

## The Short Version

A conversion is the action that matters, a submitted booking request first, and a real phone call of at least 60 seconds second.
Directions clicks and chat starts are secondary signals to watch, and Booking Paid is secondary on purpose, for now.
Smart Bidding learns only from what you count, so the switch in Chapter 8 works only when this counting is honest.
Call tracking and enhanced conversions reconnect calls and lost requests to their ads, but enhanced conversions work only once the site sends the data.
Read the funnel step by step, and send every ad to the page that matches its search.

