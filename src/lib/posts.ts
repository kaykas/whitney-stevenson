export type Post = {
  slug: string;
  /** Visible <h1> on the post page and the card heading on /blog. */
  title: string;
  /**
   * <title> text for the post, BEFORE the " | Whitney Stevenson" template
   * suffix in layout.tsx adds 20 characters. Must stay at or under 40 chars so
   * the rendered title tag fits the ~60-character SERP budget — Ahrefs/GSC flag
   * longer as "Title too long". Enforced by scripts/check-titles.mjs.
   */
  metaTitle: string;
  /** Visible lede on the post page and blog index. Length is a design call. */
  description: string;
  /**
   * <meta name="description"> for the post. Must stay under 155 characters —
   * Ahrefs/GSC flag anything longer as "Meta description too long" and Google
   * truncates it in the SERP. Enforced by scripts/check-meta-descriptions.mjs.
   */
  metaDescription: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  hero?: string;
  /**
   * Optional FAQ for the post. Rendered as a visible section under the body
   * AND as FAQPage JSON-LD from this same array, so the structured data can
   * never drift from what a reader sees. Answers are plain text, drawn only
   * from what the post itself says. Enforced by scripts/check-faq.mjs.
   */
  faqs?: { question: string; answer: string }[];
};

export const posts: Post[] = [
  {
    slug: "measure-trade-show-roi",
    title: "The Spreadsheet That Bought Year Three: How I Measure Trade Show ROI",
    metaTitle: "How to Measure Trade Show ROI",
    description:
      "Going into our second year at RSA Conference, Arxan's leadership asked me to prove the booth produced revenue. The ROI guides cover the formula, the costs and the CRM tags. They all measure one show at a time, and I think a big annual show deserves three years before anyone calls it.",
    metaDescription:
      "How to measure trade show ROI from three years running Arxan's RSA booth: source tags, a 24-hour handoff, weekly follow-up and a three-year view.",
    date: "2026-10-09",
    readingMinutes: 6,
    keywords: [
      "how to measure trade show ROI",
      "trade show ROI",
      "trade show pipeline attribution",
      "RSA Conference ROI",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "How do you measure trade show ROI?",
        answer:
          "Agree on the bookkeeping before the show. Tag every badge scan in the CRM with the show as its source, get every lead to a rep within 24 hours, track a 30-60-90 day follow-up cadence every week, and compare the show's leads against your other lead sources. At Arxan that let us point to specific RSA-sourced opportunities, their dollar value and their conversion rates by the end of Q2.",
      },
      {
        question: "What should you compare trade show leads against?",
        answer:
          "Your other lead sources. An ROI percentage on its own persuades almost nobody in a budget meeting, because the CFO immediately wonders what the same money would have done somewhere else. Showing what a booth lead turned into next to what a lead from everywhere else turned into is the part that does the persuading.",
      },
      {
        question: "How many years should you give a trade show before judging its ROI?",
        answer:
          "I'd judge a big annual trade show on a three-year arc and tell leadership that before the first deposit. At RSA, Arxan's pipeline contribution grew every year and Year Three was the highest of the three, with a booth we had barely changed. Measure a single show and you'll be tempted to cut it right when it starts compounding.",
      },
      {
        question: "When should you report trade show ROI?",
        answer:
          "For RSA, I looked at the end of Q2. That was long enough for the 90-day follow-up cadence to run its course and early enough to have real numbers on the table before anybody started arguing about next year's budget.",
      },
    ],
  },
  {
    slug: "conference-customer-dinner",
    title: "The Walk Over: How I Run a Customer Dinner During Conference Week",
    metaTitle: "Planning a Conference Customer Dinner",
    description:
      "The guides for conference customer dinners cover the invite list, the private room and the seating chart. They skip the forty minutes between the expo hall closing and the first course, which is where I've watched these dinners go sideways. So every guest gets an escort, and the notes go out before breakfast.",
    metaDescription:
      "How to plan a customer dinner during conference week: writing backward from the reservation, an escort for every guest, and notes before breakfast.",
    date: "2026-10-07",
    readingMinutes: 6,
    keywords: [
      "conference customer dinner",
      "how to plan a client dinner at a conference",
      "executive dinner planning",
      "B2B customer dinner",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "How do you plan the timing for a customer dinner during a conference?",
        answer:
          "Write the evening backward from the reservation. Seated at 7:30 means everyone walking in the door by 7:15, leaving the venue by 6:50, and the booth team told at 6:30 which guests are theirs to collect. Then walk the route yourself at the same hour, because a walk the map app calls eight minutes is a different walk during a 40,000-person conference.",
      },
      {
        question: "How do you get guests from the conference to the dinner?",
        answer:
          "Each guest gets one named person from your team who is responsible for getting them from the show floor to their chair, usually the rep who owns the account. The rep gets fifteen uninterrupted minutes with their customer on the walk over, and by 6:55 you know exactly who isn't coming.",
      },
      {
        question: "What should you do about no-shows and surprise guests at a conference dinner?",
        answer:
          "Seat in small clusters so losing any one guest doesn't strand a VP between two of your own employees, and keep a short list of nearby colleagues who can fill a seat. If a customer brings a colleague you didn't invite, the right answer is a warm hello and a chair, every time.",
      },
      {
        question: "When should you follow up after a conference customer dinner?",
        answer:
          "The thank-you email can go within 48 hours, but the notes can't wait. Everyone from your team at the table sends two or three lines about each guest they talked to before they go to sleep, or over coffee the next morning at the latest.",
      },
    ],
  },
  {
    slug: "event-run-of-show-cut-list",
    title: "The \"If Late\" Column: How I Write a Run of Show",
    metaTitle: "How to Write an Event Run of Show",
    description:
      "I've written run-of-show documents for golf tournaments, eight New Year's Eves and a live awards broadcast. The guides cover fixed times, owners and buffers. They skip what happens when the buffer is gone, so I add one more column on the far right and decide what gets cut while everyone is still calm.",
    metaDescription:
      "How to write an event run of show backwards from the cue that can't move, plus the \"If late\" column and cut list most run-of-show guides skip.",
    date: "2026-10-06",
    readingMinutes: 6,
    keywords: [
      "how to write a run of show",
      "event run of show",
      "run of show template",
      "event timeline when running late",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "Where should you start when writing an event run of show?",
        answer:
          "At the cue that can't move, and then write backwards. On New Year's Eve that's midnight, so I start at 11:59:50 p.m. and walk the night in reverse. At a corporate event it might be the room flipping to another booking at 5. Writing backward from the immovable thing tells you where the slack actually lives.",
      },
      {
        question: "What is the \"If late\" column in a run of show?",
        answer:
          "It's one more column on the far right of my run of show. Every line gets an answer before the day starts, like hold, shorten to five, or cut. The lines marked cut become a ranked cut list, agreed with the client a week out instead of decided in a whisper by the AV table.",
      },
      {
        question: "What should you cut first when an event runs late?",
        answer:
          "Content before conversation. A B2B audience will forgive a missing video. They won't forgive losing the networking break they flew in for, so in my run of show that break never gets cut.",
      },
      {
        question: "Who should decide on cuts during a live event?",
        answer:
          "One named person, written at the top of the run of show. Usually that's me. The executive sponsor gets a vote in the planning meeting, and on the day exactly one person reads the clock and calls the cut list.",
      },
    ],
  },
  {
    slug: "trade-show-booth-staff-training",
    title: "What I Tell the Booth Team the Night Before a Trade Show",
    metaTitle: "Trade Show Booth Staff Training Tips",
    description:
      "Three years running Arxan's booth at RSA Conference, between Palo Alto Networks and CrowdStrike, taught me what to say in the briefing before doors open. The usual training guides cover body language and pitches. They skip the twenty seconds after the badge scan, which is where the follow-up lives or dies.",
    metaDescription:
      "Trade show booth staff training from three years running Arxan's RSA booth: where to stand, the second question, and the note after every scan.",
    date: "2026-10-05",
    readingMinutes: 5,
    keywords: [
      "trade show booth staff training",
      "booth staffing tips",
      "trade show lead follow-up",
      "RSA Conference booth staff",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "Where should booth staff stand at a trade show?",
        answer:
          "Front corners, angled toward the aisle, and never in a cluster behind the demo table catching up on last night's dinner. A booth with your own people huddled in the middle of it looks like a private party, and nobody walking past wants to crash one.",
      },
      {
        question: "What should booth staff do right after scanning a badge?",
        answer:
          "Put one sentence in the notes field after every real conversation, before the next visitor walks up. Something the human actually said, like a renewal with their current vendor coming up in the spring. \"Wants pricing\" doesn't count, because everyone wants pricing.",
      },
      {
        question: "How did Whitney Stevenson track trade show leads at RSA Conference?",
        answer:
          "At Arxan we tagged every scan in the CRM as RSA-sourced, got every lead to a rep within 24 hours, and tracked a 30-60-90 day follow-up cadence every single week. That spreadsheet is what bought us Year Three.",
      },
    ],
  },
  {
    slug: "b2b-client-golf-outing",
    title: "The Scoring Tent Is the Meeting: How I'd Plan a B2B Client Golf Outing",
    metaTitle: "How to Plan a B2B Client Golf Outing",
    description:
      "I produced 300+ tournaments at Presidio Golf Course, and I've worked the sponsor table at B2B outings too. The planning guides cover format and budget well. They skip the stretch between the last putt and the awards, which is the only time all day your clients are standing still with nothing on their schedule.",
    metaDescription:
      "How to plan a B2B client golf outing from someone who ran 300+ tournaments: pairings, the turn, and the scoring tent most guides skip.",
    date: "2026-10-04",
    readingMinutes: 5,
    keywords: [
      "corporate golf outing planning",
      "B2B client golf event",
      "how to plan a corporate golf tournament",
      "client golf outing ideas",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "How should you set the pairings for a B2B client golf outing?",
        answer:
          "Treat the pairings sheet as the real agenda, because a foursome spends most of the day sharing two carts. I build it the way I build guest notes for a customer dinner: who is a genuinely good golfer and would be miserable with three beginners, who hasn't swung a club since college, who has allergies or a flight home that night, and which partner is hoping to meet one particular person. Put that person in the cart.",
      },
      {
        question: "What happens between the last putt and the awards at a client golf outing?",
        answer:
          "Groups finish at different times, cards get checked and totaled, and the field drifts in one foursome at a time. It's the only time all afternoon your guests are standing still with nothing on their schedule, so I plan it like a customer dinner. One person owns the scoring tent so the awards don't run late, each rep knows which finishing groups to greet, and the executive who skipped the golf shows up for this part knowing which two people to find.",
      },
      {
        question: "How should you follow up after a client golf outing?",
        answer:
          "The same way we followed up RSA Conference leads at Arxan: tag every guest at the source, get each one to a rep within 24 hours, and track the 30-60-90 day follow-up every week. Have reps write down what they learned in the car on the way home, like a kid's volleyball schedule or a contract that renews in the spring. A thank-you note that mentions the eighth hole beats one with a logo on it.",
      },
    ],
  },
  {
    slug: "event-marketing-interview-questions",
    title: "The Interview Questions I Want You to Ask Me (and What a Real Answer Sounds Like)",
    metaTitle: "Event Marketing Interview Questions",
    description:
      "Every interview guide for event marketing managers is written for the person doing the hiring. This one is written from the other chair: the questions I'd want a hiring manager to ask me, what a real answer sounds like, and the one question none of the guides include. What happened ninety days after your last event?",
    metaDescription:
      "Event marketing interview questions from the candidate's side: what a real answer sounds like, and the 90-day question every guide skips.",
    date: "2026-10-03",
    readingMinutes: 5,
    keywords: [
      "event marketing manager interview questions",
      "hiring a B2B event marketer",
      "event marketing interview",
      "field marketing events manager hiring",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "What interview question does Whitney Stevenson most want a hiring manager to ask?",
        answer:
          "What happened ninety days after your last event? None of the interview guides include it, because every question on them stops at load-out. Her best answer comes from Arxan, where she stayed long enough after RSA Conference to watch badge scans turn into specific opportunities with a dollar value attached.",
      },
      {
        question: "How should you follow up when a candidate says they measure event success by ROI?",
        answer:
          "Ask when. When did they last look at the pipeline number, and who handed it to them? A candidate who can name the week they saw the number has lived it. Whitney can: by the end of Q2 after her second RSA with Arxan, the team could point to specific opportunities and their dollar value, and that spreadsheet bought them year three.",
      },
      {
        question: "How did Whitney prove an RSA Conference booth produced revenue at Arxan?",
        answer:
          "After year one, leadership asked whether she could prove it. So the next year every badge scanned at the booth was tagged in the CRM as RSA-sourced, every lead went to a rep within 24 hours, and the team tracked the 30-60-90 day follow-up every single week.",
      },
      {
        question: "What is a quick way to tell whether an event marketer has worked a real build?",
        answer:
          "Ask what they look at first on a site visit. People who have only seen events from the attendee side talk about the ballroom. People who have stood at a loading dock with a truck idling talk about the dock. Whitney starts at the back door every time and asks how tall the dock door is long before she says anything nice about the chandeliers.",
      },
    ],
  },
  {
    slug: "first-venue-walkthrough",
    title: "The First Walkthrough: What I Look For Before Anyone Signs the Venue Contract",
    metaTitle: "What I Look For on a Venue Walkthrough",
    description:
      "My homepage promises white-glove care from the first walkthrough to load-out, and people mostly ask about load-out. The walkthrough is where I earn it. Here's what I'm doing when I wander a venue with a coffee and my phone camera, and why the loading dock gets more of my attention than the ballroom.",
    metaDescription:
      "How a B2B event marketer walks a venue before the contract: the loading dock, the outlets, and the route a late VP takes from the curb.",
    date: "2026-10-01",
    readingMinutes: 4,
    keywords: [
      "event venue walkthrough",
      "venue site visit checklist",
      "B2B event planning venue",
      "conference venue selection",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "What should you check first on a venue walkthrough?",
        answer:
          "The loading dock. I start at the back door because that's where build week goes wrong. I want to know how tall the dock door is, how long a truck can sit there before somebody writes a ticket, whether the freight elevator fits a crate in real life or only on paper, and who holds the key at 9 p.m. on a Sunday when the fabricator is running late.",
      },
      {
        question: "What do you look at in the main room during a site visit?",
        answer:
          "Mostly the cheap seats. I stand where the last row will be and check whether I can read a slide from there. I count the outlets, because a breakout room with two outlets and a demo station is going to have a very exciting Tuesday. Then I find the spot inside the door where people will bunch up and start moving the registration table in my head.",
      },
      {
        question: "How do you check the guest experience on a walkthrough?",
        answer:
          "I go back out to the curb and come in again as the VP who just got off a delayed flight. How far is the rideshare drop from the door? Is there signage? Is the accessible entrance around the side past the dumpsters? Where can a speaker sit quietly for ten minutes? And I time the walk from the main room to the nearest restroom, every single time.",
      },
      {
        question: "What happens to your walkthrough notes after the visit?",
        answer:
          "They go back to the venue the same day, photos of the power panel and the dock door included. That gives the venue a chance to correct me, and it starts a relationship with their operations people, who are the ones I'll be calling at 6 a.m. on show day.",
      },
    ],
  },
  {
    slug: "event-concierge-b2b-hospitality",
    title: "Why \"Concierge\" Is in My Title: The Half of Events Nobody Recaps",
    metaTitle: "What an Event Concierge Actually Does",
    description:
      "The word next to my name on this site confuses people, and I kept it on purpose. In B2B events, concierge work is the part nobody puts in the recap deck: the VP who landed late and hasn't eaten, the partner who flew in to meet one person. It's also where a lot of pipeline quietly moves.",
    metaDescription:
      "What an event concierge does at B2B events: guest notes and speaker care, the quiet hospitality work that moves B2B pipeline.",
    date: "2026-09-30",
    readingMinutes: 4,
    keywords: [
      "event concierge B2B",
      "executive event hospitality",
      "customer dinner event planning",
      "VIP guest experience events",
      "B2B event marketer San Francisco",
    ],
    faqs: [
      {
        question: "What does an event concierge do at a B2B event?",
        answer:
          "She remembers. The floorplan, booth build and shipping manifests can mostly ride on a good checklist. The concierge half is knowing that the VP who flew in for your customer dinner landed late and hasn't eaten, that the partner you need came to meet exactly one person on your team, and that the 2 p.m. speaker wants ten quiet minutes more than anything on the green room table.",
      },
      {
        question: "Why does concierge work matter for B2B pipeline?",
        answer:
          "Because the big moments in a B2B deal rarely happen in the aisle. A badge scan is a maybe. The customer dinner, the executive meeting in a hotel suite, the partner seated next to your CRO on purpose: that's where a deal jumps a stage. Whitney tracked RSA Conference pipeline at Arxan from badge scan through the 90-day rep follow-up, and those numbers start with how a guest felt walking out the door.",
      },
      {
        question: "Where did Whitney Stevenson learn event hospitality?",
        answer:
          "Backstage, mostly. Running artist relations at the Latin Billboard Awards taught her to read every rider as a performer saying what they need to walk on stage feeling like themselves. Seven years and 300+ tournaments at Presidio Golf taught her that the fastest way to make a Saturday feel effortless is to already know the members before they reach the registration table.",
      },
      {
        question: "How does an event concierge keep track of guests?",
        answer:
          "Notes. Nice helps, notes scale. Whitney writes down allergies, the name of somebody's kid, the flight that got bumped to the red-eye, and the person a guest hoped to meet but was too polite to ask for. That file grows every time she sees someone, which is a big part of why eight years of the same New Year's Eve party got warmer each December.",
      },
    ],
  },
  {
    slug: "freelance-to-in-house",
    title: "Why I Want a Year Two: Trading Freelance for One Team",
    metaTitle: "Why I'm Going In-House After Freelance",
    description:
      "Freelance event work ends on load-out night, and you never learn what the badge scans turned into. After agency work at Plan Experiential and the long runs I'm proudest of (Presidio Golf, eight years of New Year's Eve), here's why I want to join one events team and stay long enough to compound.",
    metaDescription:
      "Why a freelance event producer wants to go in-house: recurring work compounds, and the best events are built from last year's receipts.",
    date: "2026-09-29",
    readingMinutes: 4,
    keywords: [
      "in-house event marketing manager",
      "freelance to in-house events",
      "B2B event marketer hiring",
      "event coordinator San Francisco",
      "recurring event strategy",
    ],
    faqs: [
      {
        question: "Why is Whitney Stevenson moving from freelance to an in-house events role?",
        answer:
          "Freelance event work ends on load-out night, and you never find out what the badge scans turned into. I want to join one events team and stay long enough for the work to compound, the way it did across three straight years of RSA Conference at Arxan.",
      },
      {
        question: "Why does recurring event work get better every year?",
        answer:
          "Year two gets built out of year one's receipts. At Arxan I was still there ninety days after RSA when the reps followed up, so we knew which parts of the booth were earning their keep. By year five of a recurring event, the caterer picks up at 11 p.m. because you picked up for them once, and the January post-mortem is a document people actually open.",
      },
      {
        question: "Would Whitney start in an event coordination role?",
        answer:
          "Happily! If the right company needs me to begin by wrangling shipping manifests and badge lists, I'll do it, because I know exactly what a perfect badge list is worth at 7 a.m. on day one of a show. I'd rather earn the bigger job from inside the building.",
      },
      {
        question: "What does a freelance event producer bring to an in-house team on day one?",
        answer:
          "Someone who has already made the scary mistakes on somebody else's budget. Agency life means learning a new stakeholder map every few weeks and reading a client's brand guidelines on the drive to the venue. When something breaks, I fix it and keep the room calm.",
      },
    ],
  },
  {
    slug: "sunglasses-shops-and-bodywork",
    title:
      "Two Shops and a Treatment Table: The Other Half of My Resume",
    metaTitle: "Sunglasses Shops, Bodywork, and Events",
    description:
      "Before the Super Bowl and RSA, I founded a sunglasses venture and grew it to two San Francisco locations, and I still practice bodywork alongside event work. What a storefront and a treatment table taught me about foot traffic, scaling past the founder, and noticing trouble ten minutes before it arrives.",
    metaDescription:
      "Founding two San Francisco sunglasses shops and practicing bodywork taught me more about event hospitality than any trade show ever did.",
    date: "2026-09-28",
    readingMinutes: 5,
    keywords: [
      "retail founder event marketer",
      "event hospitality philosophy",
      "booth design foot traffic",
      "San Francisco sunglasses shop",
      "bodywork and event production",
    ],
    faqs: [
      {
        question: "What did Whitney Stevenson do before event marketing?",
        answer:
          "She founded a sunglasses venture in San Francisco and grew it to two locations. Before the Super Bowl and before RSA, she was the person unlocking the door in the morning and counting the drawer at night. It's the least glamorous line on her resume, and she'd put it near the top.",
      },
      {
        question: "What does running a retail shop teach an event marketer?",
        answer:
          "That foot traffic is honest. People walk in or they walk past, and you know which by lunch. Every booth Whitney has designed since starts with the question she used to ask about the storefront: what does a stranger see in their first three steps, and does any of it give them a reason to stop? She carried that straight into three years of running Arxan at RSA.",
      },
      {
        question: "What did opening a second store teach Whitney about scaling events?",
        answer:
          "Instinct doesn't travel, and a checklist does, as long as the person holding it understands why each line is there. A second location forced her to write down everything she did by instinct and see which pieces survived the trip across town. That lesson went into 300+ tournaments at Presidio Golf, where the volunteer at the registration table has to know the reason behind a rule to make a good call when the rule doesn't fit.",
      },
      {
        question: "What kind of bodywork does Whitney practice, and how does it connect to events?",
        answer:
          "She's a practicing bodyworker trained in Facial Release and Access Consciousness, working one person at a time alongside her event work. Both jobs run on attention. On the table you notice what a person is carrying before they say a word, and on a show floor you notice the exhibitor who is completely fine and about ten minutes from very much not fine. The earlier you notice, the smaller the fix.",
      },
      {
        question: "How does Whitney think about hospitality in B2B event marketing?",
        answer:
          "Event marketing is hospitality with a budget line and a pipeline target attached. She learned the hospitality half behind a counter and beside a treatment table, long before anyone handed her a badge scanner, and it still does most of the work. Her measure of good lighting: nobody has ever thanked her for it!",
      },
    ],
  },
  {
    slug: "eight-years-sf-nye-party",
    title:
      "Eight Years of Midnight: What Producing the Same Party Taught Me",
    metaTitle: "Eight Years of SF's New Year's Eve",
    description:
      "Eight consecutive years producing San Francisco's New Year's Eve party. Midnight is the one deadline in this business that never moves, and a recurring event teaches you things a one-off never can: compounding vendor trust, the January post-mortem as the real deliverable, and hospitality that turns a ticketed night into an appointment people keep.",
    metaDescription:
      "Eight consecutive years producing San Francisco's New Year's Eve party. What a recurring event teaches you that a one-off never can.",
    date: "2026-09-27",
    readingMinutes: 6,
    keywords: [
      "New Year's Eve event production",
      "recurring event strategy",
      "San Francisco NYE party producer",
      "annual event production",
      "countdown run of show",
    ],
    faqs: [
      {
        question: "How long has Whitney Stevenson produced San Francisco's New Year's Eve party?",
        answer:
          "Eight consecutive years. Same night, same immovable second, a different room full of people every time. It's the longest running client relationship of her career, and eight midnights in, every one of them has landed on time.",
      },
      {
        question: "Why is year two of a recurring event harder than year one?",
        answer:
          "Year one runs on adrenaline and sheer hours. Year two is when you find out what was skill and what was luck: the checklist nobody wrote down is gone, and the loading dock has a new manager who has never heard your name. Whitney's fix is to write the post-mortem in January while the bruises are still visible: what broke, what almost broke, who saved the night, and which vendor earned a bigger slice next year.",
      },
      {
        question: "How do you produce a New Year's Eve countdown?",
        answer:
          "Backwards, starting from 11:59:50 p.m. The last ten seconds belong to the room and the fifty before them belong to the producer. Champagne is poured and staged by 11:40, every time. Anything that can be solved before 11 p.m. gets solved before 11 p.m., because in the last hour of the year the crowd compresses, the noise doubles, and every errand takes three times as long.",
      },
      {
        question: "What does a recurring event build over time?",
        answer:
          "Relationships, mostly. The house electrician who answers your text in November, the security lead who already knows your pinch points. By year five the production has a bench, and guests start planning their December around the party. Strangers arrive at nine, and by midnight the floor feels like a reunion!",
      },
    ],
  },
  {
    slug: "latin-billboard-awards-artist-relations",
    title:
      "Artist Relations at the Latin Billboard Awards: Three Artists, One Broadcast Clock",
    metaTitle: "Backstage at the Latin Billboard Awards",
    description:
      "Running artist relations for three performing artists at the Latin Billboard Awards — riders as trust contracts, run-of-show timing against a broadcast clock that doesn't bend, and why hospitality is risk management with warmer lighting.",
    metaDescription:
      "Artist relations for three performers at the Latin Billboard Awards — riders, green rooms, and run-of-show timing against a broadcast clock.",
    date: "2026-09-26",
    readingMinutes: 7,
    keywords: [
      "Latin Billboard Awards",
      "artist relations events",
      "backstage hospitality production",
      "run of show broadcast",
      "awards show production",
    ],
    faqs: [
      {
        question: "What did Whitney Stevenson do at the Latin Billboard Awards?",
        answer:
          "She ran artist relations for three performing artists. In practice that meant one promise: when the stage manager called each artist to position, the artist was there and ready. Getting there meant absorbing every problem in the building before it could reach the person whose name was in the rundown.",
      },
      {
        question: "How does Whitney handle an artist rider?",
        answer:
          "Like a booth build spec. Every line gets executed or flagged, and nothing gets quietly dropped. Two days out she walks the green room with the rider in hand and checks each item against what is physically there. If the venue can't source something, the tour manager hears it from her before load-in, while it's still a logistics note and long before it turns into a crisis.",
      },
      {
        question: "How is run of show different for a live awards broadcast?",
        answer:
          "A broadcast rundown doesn't bend. Commercial breaks are sold, satellite windows are booked, and the network decides when the show ends. So the unit of measure is the call-to-position. Whitney ran the clock backward from every call: when glam finishes, when the artist starts moving, who clears the route and who holds the elevator.",
      },
      {
        question: "How do you run artist relations for three artists on one show?",
        answer:
          "As three separate operations. One of Whitney's artists wanted energy and a crowd right up to the walk, one wanted silence and a single handler, and one arena veteran wanted accurate information early with no decoration. She read which was which at the first rehearsal and built the green room, the runners and the updates around each one.",
      },
      {
        question: "What did broadcast production teach Whitney that corporate events didn't?",
        answer:
          "To rehearse the recoveries along with the plan. Corporate production teaches precision against a plan. Broadcast teaches precision against a clock that doesn't know you exist, where a performance runs long or a stage reset eats ninety seconds of the changeover and the show keeps going anyway.",
      },
    ],
  },
  {
    slug: "illumio-latam-channel-partnership",
    title: "How I Built Illumio's First LATAM Channel Partnership",
    metaTitle: "Building Illumio's First LATAM Channel",
    description:
      "Day-1 of standing up Illumio's Latin America channel program — Brazil, São Paulo, Mexico — from zero. Partner recruiting, market strategy, and what actually moved the targets in a region with no prior footprint.",
    metaDescription:
      "Standing up Illumio's first Latin America channel program from zero — Brazil, Sao Paulo, Mexico. Partner recruiting and what moved the targets.",
    date: "2026-04-28",
    readingMinutes: 7,
    keywords: [
      "Illumio LATAM channel",
      "B2B channel partner program",
      "Latin America channel events",
      "channel marketing Latin America",
    ],
    hero: "/whitney/photos/illumio-golf-booth.jpg",
    faqs: [
      {
        question: "What did Illumio have in Latin America when Whitney Stevenson started?",
        answer:
          "Nothing yet. No channel program, no regional partners, no localized collateral and no relationships on the ground in Brazil, São Paulo or Mexico. The mandate was to build the program from scratch and hit the targets.",
      },
      {
        question: "Where did Whitney start when building Illumio's LATAM channel?",
        answer:
          "On planes, for the first ninety days. São Paulo came first, because that's where the LATAM cybersecurity industry clusters and where channel decision-makers actually take meetings. Then Mexico City, then Brazil more broadly. She learned which restaurants the regional CISOs go to, which trade shows mattered, and which partners already had budget for Zero Trust.",
      },
      {
        question: "What moved the targets for Illumio's Latin America channel program?",
        answer:
          "Hospitality and trust. The white papers and MDF budgets already existed. What partners needed was proof Illumio would still be there in twelve months, so Whitney ran quarterly partner roundtables in São Paulo, co-marketed regional events with anchor accounts, showed up at Latin American cybersecurity conferences with the same polish as the big San Francisco shows, and followed up within 24 hours every time.",
      },
      {
        question: "What would Whitney do differently building a LATAM channel program again?",
        answer:
          "Bring the regional voice into the global event calendar earlier. Some of the best LATAM co-marketed plays could have happened sooner if the global event team had aligned to LATAM sequencing instead of the other way around.",
      },
      {
        question: "Did the partners from Illumio's first LATAM program stick?",
        answer:
          "Yes! Every partner Whitney onboarded in those first ninety days is still in Illumio's book today.",
      },
    ],
  },
  {
    slug: "the-target-run",
    title: "The Target Run: Why I Don't Panic",
    metaTitle: "The Target Run: Why I Don't Panic",
    description:
      "A breakout speaker walked on stage with no screen. The sales rep had forgotten the TV. I drove to Target. The session went on. A short essay on calm-under-pressure as a craft, not a personality trait.",
    metaDescription:
      "A speaker hit the stage with no screen. I drove to Target and the session went on. On calm under pressure as a craft, not a personality trait.",
    date: "2026-04-28",
    readingMinutes: 4,
    keywords: [
      "event production crisis",
      "white-glove event execution",
      "B2B event hospitality",
      "calm under pressure events",
    ],
    faqs: [
      {
        question: "What is the Target Run story?",
        answer:
          "A breakout speaker walked on stage and there was no screen, because the sales rep had forgotten the TV. The room was full and the clock was running, so Whitney drove to Target and came back with a TV. The session went on, the speaker delivered the talk he'd prepared, and nobody in the room except the four people in the back knew anything had gone wrong.",
      },
      {
        question: "What is an event producer's job when something breaks?",
        answer:
          "Making sure the audience never finds out. The speaker keeps their dignity, the sponsor keeps their ROI, and the room keeps its energy. Whitney's part is keeping a level head and figuring out which direction the nearest big-box electronics retailer is in.",
      },
      {
        question: "How does Whitney Stevenson stay calm under pressure at events?",
        answer:
          "She treats calm as a practice she builds on purpose. She has run enough events to have already seen most of the failure modes, she separates \"this is bad\" from \"this is solvable in the next nine minutes,\" and she has trained herself to act before she explains.",
      },
      {
        question: "Why does composure matter so much for an event team?",
        answer:
          "Panic is contagious, and so is composure. If the team watches the lead spiral, the problem doubles: the original failure plus a frightened team that can't execute. When Whitney says \"I'm driving to Target, you handle the speaker, you handle the AV crew, we reconvene in twenty,\" the team moves and the crisis splits into manageable parts.",
      },
      {
        question: "Who is a good fit for on-the-ground event production?",
        answer:
          "Someone whose nervous system flattens out and starts problem-solving when something goes wrong. If yours spikes instead, it's a tough role. Whitney is the flatten-out-and-solve kind, and always has been!",
      },
    ],
  },
  {
    slug: "anchoring-arxan-three-years-rsa",
    title: "Anchoring Arxan at Three Years of RSA Conference",
    metaTitle: "Three Years of RSA: Anchoring Arxan",
    description:
      "Three consecutive years running Arxan Technologies' presence at RSA Conference — booth fabrication, ROI tracking, and pipeline attribution in the most over-budgeted, hyper-competitive trade show in cybersecurity. What worked, what we cut, and why showing up the same way three years in a row is the strategy.",
    metaDescription:
      "Three straight years running Arxan's RSA Conference presence — booth build, ROI tracking, pipeline attribution. What worked and what we cut.",
    date: "2026-04-28",
    readingMinutes: 8,
    keywords: [
      "RSA Conference booth strategy",
      "cybersecurity event marketing",
      "trade show ROI tracking",
      "B2B booth fabrication",
      "Arxan Technologies events",
    ],
    hero: "/whitney/photos/rsa-year-three.jpeg",
    faqs: [
      {
        question: "How did Whitney Stevenson run Arxan's presence at RSA Conference?",
        answer:
          "She ran it for three consecutive years: same company, same neighborhood on the floor, wedged between Palo Alto Networks and CrowdStrike, next to competitors who all spent more. Pipeline contribution grew every year, and Year Three was the highest of the three.",
      },
      {
        question: "How should a smaller vendor design a booth at RSA Conference?",
        answer:
          "Skip the over-designed booth. Pick one core message, render it cleanly so it reads from 30 feet, and staff it with people who can hold a 90-second technical conversation without reading from a card. At Arxan, that calmer, more confident energy is what made people who walked past Palo Alto Networks and CrowdStrike stop at our booth.",
      },
      {
        question: "How do you track trade show ROI and pipeline attribution?",
        answer:
          "In Year Two, Whitney instrumented everything. Every badge scanned at the Arxan booth was tagged in the CRM with RSA-source attribution, every lead went to a rep within 24 hours, and every rep had a 30-60-90 day follow-up cadence tracked weekly. By the end of Q2 the team could point to specific RSA-sourced opportunities, their dollar value, and conversion rates compared to other lead sources. That spreadsheet is what bought Year Three!",
      },
      {
        question: "Should you redesign your trade show booth every year?",
        answer:
          "Don't! The buyers walking RSA are mostly the same CISOs, security architects and channel partners every year, and by Year Three Arxan registered as a fixture. Whitney tightened the booth slightly, refreshed the demo, and let the consistency do the work. Year One you arrive, Year Two you prove the math, Year Three you become a fixture.",
      },
    ],
  },
  {
    slug: "presidio-golf-300-tournaments",
    title: "What 300+ Tournaments at Presidio Golf Taught Me About Operations",
    metaTitle: "What 300+ Tournaments Taught Me",
    description:
      "I founded the women's club at the West Coast's second-oldest golf course and produced 300+ tournaments over seven years. The lessons aren't about golf — they're about what operations actually means when nothing can fail and every detail compounds.",
    metaDescription:
      "I founded the women's club at the West Coast's second-oldest course and produced 300+ tournaments. What operations means when nothing can fail.",
    date: "2026-04-28",
    readingMinutes: 7,
    keywords: [
      "event operations philosophy",
      "tournament logistics",
      "Presidio Golf Course",
      "founder women's golf club",
      "white-glove event operations",
    ],
    hero: "/whitney/photos/presidio-merch-medallion.jpg",
    faqs: [
      {
        question: "What did Whitney Stevenson do at Presidio Golf Course?",
        answer:
          "She founded the women's club at Presidio Golf Course in San Francisco, the West Coast's second-oldest course, and produced more than 300 tournaments over seven years. The club started with a charter membership of about thirty and ended her tenure at multiples of that.",
      },
      {
        question: "What are the load-bearing moments of a golf tournament?",
        answer:
          "Five of them: arrival check-in, the shotgun horn, the turn (when half the field hits Hole 10), the scoring tent at finish, and the awards. If those hit clean, everything else can absorb minor friction. If any one of them breaks, the whole day feels off.",
      },
      {
        question: "How do small details compound in event operations?",
        answer:
          "The temperature of the coffee at 7am check-in, the sequencing of the cart staging, where the photographer stands at the awards, whether the clubhouse music is two clicks too loud. None of them changes anyone's day on its own. Together they decide whether a player walks away saying \"that was a great day\" or \"that was fine,\" and that gap is the difference between a club that grows and a club that doesn't.",
      },
      {
        question: "How did the Presidio women's golf club grow?",
        answer:
          "Through the day-of experience. People joined because a friend had played one of the tournaments and called them on the way home. Whitney got the experience right before spending on marketing, because marketing pulls people in once and the experience is what brings them back and makes them recruit their friends.",
      },
      {
        question: "What do golf tournaments have to do with B2B event marketing?",
        answer:
          "The same skillset runs both. A partner roundtable for a B2B tech company has the same load-bearing moments, the same compounding small details, and the same insistence that the experience is the marketing. Three hundred tournaments is what made Whitney good at corporate events.",
      },
    ],
  },
  {
    slug: "pepsico-tostitos-super-bowl-2026",
    title: "PepsiCo Tostitos at Super Bowl 2026: Behind the Activation",
    metaTitle: "Tostitos at Super Bowl 2026",
    description:
      "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026, Pier 39 Fiesta Zone. A massive-scale brand activation in a city that had never hosted the Super Bowl. Build week, show week, load-out — what flawless execution under that kind of pressure actually requires.",
    metaDescription:
      "On-the-ground production for PepsiCo Tostitos at Super Bowl 2026, Pier 39 Fiesta Zone. Build week, show week, load-out — what flawless requires.",
    date: "2026-04-28",
    readingMinutes: 6,
    keywords: [
      "Super Bowl brand activation",
      "PepsiCo event production",
      "experiential marketing San Francisco",
      "Tostitos Fiesta Zone",
      "high-pressure event execution",
    ],
    hero: "/whitney/photos/tostitos-fiesta-zone.jpeg",
    faqs: [
      {
        question: "What was the Tostitos Fiesta Zone at Super Bowl 2026?",
        answer:
          "A multi-day PepsiCo Tostitos activation at Pier 39 for Super Bowl LX in San Francisco. It had a branded structure, roaming chip-cooler robots and family programming, and Whitney was on the ground producing it.",
      },
      {
        question: "Why does build week decide a Super Bowl activation?",
        answer:
          "Because build week is when every problem nobody planned for shows up: a loading dock constraint missing from the site survey, a damaged panel whose replacement is on a truck somewhere on I-80, a permit revision before Saturday programming. Whitney solves those with relationships built before arrival, like the fabricator's lead carpenter, the pier's operations manager and a local permit runner who can unblock things in 90 minutes.",
      },
      {
        question: "Who was the audience at the Tostitos Fiesta Zone?",
        answer:
          "Four audiences at once: families with kids, tourists wandering the pier, NFL fans walking between events, and PepsiCo stakeholders watching the brand experience. Families got a photo moment with the chip-cooler robot, locals got a clean space that didn't feel like a corporate intrusion on their pier, and executives got a disciplined operation with zero visible friction.",
      },
      {
        question: "What does a good load-out look like after a Super Bowl activation?",
        answer:
          "The pier goes back to public access in six hours. Every panel, cable and crate is back on a truck, the site is photographed clean for hand-back, and vendor invoices and damage assessments are filed within 48 hours. Production teams that nail load-out get rebooked!",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
