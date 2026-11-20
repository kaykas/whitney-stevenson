import Link from "next/link";

export function boothStaffTrainingPost() {
  return (
    <>
      <p>
        It&rsquo;s the night before the show. The booth is built, the
        scanners are charging on a hotel desk, and half the team flew in this
        afternoon. Someone from sales asks what they&rsquo;re supposed to do
        tomorrow besides scan badges. Whatever you say in the next twenty
        minutes is your booth staff training, whether you planned it or not.
      </p>

      <p>Every booth has a night before.</p>

      <p>
        For three straight years I ran Arxan Technologies&rsquo; presence at
        RSA Conference, on a show floor with forty thousand attendees and a
        vendor hall that takes 25 minutes to cross, with our booth wedged
        between Palo Alto Networks and CrowdStrike. Both of them spent more
        than we did. Every year. What we had was the people in our booth, and
        the briefing I gave them before doors opened, and that briefing is
        what this Field Note is about.
      </p>

      <p>
        The booth staff training guides that rank for this cover the basics
        well. Give everyone a role and cross-train them so lunch breaks
        don&rsquo;t leave a hole. Keep your arms uncrossed and your phone in
        your pocket. Ask about the visitor&rsquo;s problem before you start in
        on the product, and qualify people instead of chatting all afternoon
        with whoever wanted a pen. I agree with every word of that (the pen
        people are lovely, and they are not your pipeline). What none of them
        talk about is the twenty seconds after a good conversation ends, when
        the scanner beeps and the visitor walks off toward the next aisle.
        I think that&rsquo;s where more trade show budget quietly leaks out
        than anywhere else on the floor.
      </p>

      <h2>Why the usual booth staff training misses the follow-up</h2>

      <p>
        What most teams try first is a training deck: roles, body language, a
        30-second pitch, and a target number of scans. It breaks in practice
        because the scan count turns into the goal. Staff race to beep
        badges, the notes field stays empty, and on Wednesday the rep
        working the list has a name, a title and a company and no idea what
        anyone said. The follow-up email starts cold, and the show looks
        worse in the budget meeting than it was on the floor.
      </p>

      <p>
        What works for me is one short briefing the night before doors open,
        built around five things: where to stand, a 90-second conversation
        each person can hold without a card, a hand-off to a colleague for
        the second question, one sentence in the notes field after every real
        conversation, and one named person who handles anything broken. At
        Arxan every scan was tagged in the CRM as RSA-sourced and went to a
        rep within 24 hours, and the note is what made that 24-hour handoff
        worth anything.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Booth staff training approaches compared: what each covers, when
            it happens, who it suits and where it falls short
          </caption>
          <thead>
            <tr>
              <th scope="col">Approach</th>
              <th scope="col">What it covers</th>
              <th scope="col">When</th>
              <th scope="col">Best for</th>
              <th scope="col">Where it falls short</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Hand out shirts and scanners</th>
              <td>Nothing beyond the logo and the badge reader</td>
              <td>Morning of the show</td>
              <td>No one</td>
              <td>
                Staff cluster behind the demo table and the notes field stays
                empty
              </td>
            </tr>
            <tr>
              <th scope="row">Standard training deck</th>
              <td>
                Roles, cross-training for breaks, body language, a 30-second
                pitch, qualifying visitors
              </td>
              <td>Days or weeks before</td>
              <td>First-time booth staff who need the basics</td>
              <td>
                Stops at the badge scan, so the rep gets a name and no
                context
              </td>
            </tr>
            <tr>
              <th scope="row">Product sessions</th>
              <td>
                Enough product depth to answer the second question a
                technical buyer asks
              </td>
              <td>Weeks before</td>
              <td>
                Staff who can&rsquo;t yet hold a 90-second technical
                conversation
              </td>
              <td>
                Covers the product, not the floor: where to stand, the notes,
                who fixes what
              </td>
            </tr>
            <tr>
              <th scope="row">My night-before briefing</th>
              <td>
                Where to stand, the 90-second bar, hand-offs, one note per
                scan, one owner for broken things, lunch shifts
              </td>
              <td>The night before doors open</td>
              <td>
                A team that knows the product and reports to the person
                running the booth
              </td>
              <td>
                Can&rsquo;t teach the product in one evening, and assumes
                everyone in the booth reports to you
              </td>
            </tr>
            <tr>
              <th scope="row">Split briefing for mixed crews</th>
              <td>
                The same briefing, divided between your staff and partner or
                agency staff
              </td>
              <td>The night before, in two parts</td>
              <td>Booths where half the crew works for someone else</td>
              <td>More coordination, and you don&rsquo;t control everyone&rsquo;s notes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The Aisle Is a Sidewalk</h2>

      <p>
        I learned to read foot traffic behind the counter of{" "}
        <Link href="/blog/sunglasses-shops-and-bodywork">
          my own sunglasses shop
        </Link>{" "}
        in San Francisco, years before anyone handed me a lead scanner. A
        stranger decides in their first three steps whether to stop. At RSA
        you get about 0.6 seconds of that decision, and the booth can only
        carry part of it. We built Arxan&rsquo;s to read cleanly from 30 feet,
        with one anchor message and no clutter. The rest of the work is
        whoever is standing at the front edge of the carpet.
      </p>

      <p>
        I tell the team where to stand. Front corners, angled toward the
        aisle, and never in a cluster behind the demo table catching up on
        last night&rsquo;s dinner. A booth with your own people huddled in the
        middle of it looks like a private party, and nobody walking past wants
        to crash one.
      </p>

      <h2>Ninety Seconds, No Card</h2>

      <p>
        At Arxan we staffed the booth with people who could hold a 90-second
        technical conversation without reading from a card. That bar is
        higher than it sounds. The buyers on that floor are mostly CISOs and
        security architects, with a healthy sprinkling of channel partners,
        and they can hear a memorized paragraph from two booths away.
      </p>

      <p>
        Most guides tell you to rehearse a 30-second pitch, and you should. I
        care more about the second question, the one a security architect
        asks after nodding politely through your first answer, because
        that&rsquo;s the moment the visitor finds out whether they&rsquo;re
        talking to someone who knows the product or someone who got handed a
        logo shirt on Sunday night. Anyone who can&rsquo;t answer it needs to
        know exactly who in the booth can, and how to walk the visitor over
        with an introduction instead of a shrug.
      </p>

      <h2>The Twenty Seconds After the Scan</h2>

      <p>This is the part of my briefing that runs longest.</p>

      <p>
        A badge scan is a maybe. On its own it gives you a name, a title and a
        company. In Year Two at Arxan, leadership asked whether I could prove
        the booth produced revenue, and a pile of maybes was never going to
        answer that. We tagged every scan in the CRM as RSA-sourced, got every
        lead to a rep within 24 hours, and tracked a 30-60-90 day follow-up
        cadence every single week. That spreadsheet is what bought us{" "}
        <Link href="/blog/anchoring-arxan-three-years-rsa">Year Three</Link>.
      </p>

      <p>
        The spreadsheet has a blind spot, though. The rep
        who picks up a lead on Tuesday has no idea what was said in the aisle
        on Monday, unless the person in the booth wrote it down, right then,
        before the next visitor walked up and wiped it out of their head.
        That note is also what sorts a scan into{" "}
        <Link href="/blog/post-event-follow-up-sla">
          a tier in my follow-up SLA
        </Link>
        , and the share of scans with a note is{" "}
        <Link href="/blog/calculating-trade-show-roi">
          the floor number I check every night
        </Link>
        .
      </p>

      <p>
        My rule for the booth team is one sentence in the notes field after
        every real conversation. Something the human actually said. A renewal
        with their current vendor coming up in the spring. A question they
        asked twice. The boss who makes the call and stayed home this year. Their
        kid starting college in the fall, if it came up and they lit up
        talking about it.
        &ldquo;Wants pricing&rdquo; doesn&rsquo;t count, because everyone
        wants pricing. It&rsquo;s the same habit I use for guest notes on the{" "}
        <Link href="/blog/event-concierge-b2b-hospitality">concierge</Link>{" "}
        side of events, pointed at pipeline instead of oat milk.
      </p>

      <p>
        The best follow-up email starts with something the buyer said at the
        booth. The worst one starts with &ldquo;Great meeting you at
        RSA!&rdquo; and a calendar link, and lands in the inbox of someone who
        only stopped for the swag (I have{" "}
        <Link href="/blog/trade-show-giveaways">opinions about the swag</Link>
        , too). Give your staff a quick tag for those scans. The rep working down the list on Wednesday will thank
        you, and so will whoever has to defend the trade show budget in
        January.
      </p>

      <h2>One Person Owns the Broken Stuff</h2>

      <p>
        Something will go wrong. I once watched a breakout speaker walk on
        stage with no screen because a sales rep had forgotten the TV, and I
        ended up on{" "}
        <Link href="/blog/the-target-run">a very fast Target run</Link>. On a
        show floor the problems are smaller and constant. A scanner dies at
        10 a.m., or the demo laptop picks the busiest hour of the day to
        install an update.
      </p>

      <p>
        In the briefing I name one person who handles anything broken, and
        it&rsquo;s usually me. Everybody else stays at the front edge of the
        carpet and keeps talking to the person in front of them. A booth where
        three staffers are crouched over a dead monitor is a booth with nobody
        in the aisle.
      </p>

      <p>
        All of this assumes the people in the booth report to you. When half
        of them work for a partner or an agency, I split the briefing up, and
        I wrote that version as{" "}
        <Link href="/blog/exhibition-stand-staff-training">
          exhibition stand staff training for mixed crews
        </Link>
        .
      </p>

      <p>
        The brief and the booth quote that come months before this briefing
        are in{" "}
        <Link href="/blog/rsa-conference-booth-design">
          my notes on RSA Conference booth design
        </Link>
        .
      </p>

      <h2>Snacks</h2>

      <p>
        Feed them before they ask, and rotate lunch in shifts, because a
        hungry rep pitches like a hostage.
      </p>

      <h2>How the Briefing Ends</h2>

      <p>
        I end the same way every time. Who&rsquo;s here that we most want to
        see, and who on the team knows them. Where the notes go. Where I&rsquo;ll
        be. Then I tell everyone that the scanner count at the end of the day
        is the number I care about least, and I watch the new folks look
        relieved.
      </p>

      <h2>Where each approach fits, and who should skip my briefing</h2>

      <p>
        A standard training deck is a fine start for people who have never
        worked a booth. Product
        sessions win whenever the crew can&rsquo;t hold a technical
        conversation yet, and no briefing of mine fixes that in one evening.
        The night-before briefing fits a team that already knows the product
        and needs to agree on the floor: where to stand, where the notes go,
        and who fixes what.
      </p>

      <p>
        Skip my version if your booth is staffed by new hires meeting the
        product for the first time, or if no one in sales will pick up leads
        within 24 hours. In the first case, run product sessions first. In
        the second, fix the handoff, because a perfect note in the CRM
        doesn&rsquo;t help if nobody reads it until the following month.
      </p>

      <h2>The scanner count I care about least</h2>

      <p>
        I ran this briefing on the most crowded floor in cybersecurity, three
        years in a row, next to neighbors with much bigger budgets, and
        Arxan&rsquo;s pipeline contribution from RSA grew every one of those
        years.
      </p>

      <p>
        If you&rsquo;re the field marketing manager with a show coming up and
        a booth crew you haven&rsquo;t briefed yet,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! Every scan without a
        note is a cold email on Wednesday. I&rsquo;ll bring the briefing, and
        snacks for the booth.
      </p>
    </>
  );
}
