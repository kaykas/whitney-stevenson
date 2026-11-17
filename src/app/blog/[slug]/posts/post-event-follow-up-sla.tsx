import Link from "next/link";

export function postEventFollowUpSlaPost() {
  return (
    <>
      <p>The scanner export lands on Friday.</p>

      <p>
        Somebody on the booth team (usually whoever signed for the scanners)
        downloads a CSV from the lead retrieval app on the last afternoon of
        the show, emails it to marketing ops and gets on a plane. Marketing
        ops was at the show too. The file goes into the CRM the following
        Wednesday, a rep opens eighty new names with empty notes fields on
        Thursday, and by then the security architect who spent eleven minutes
        at your demo station has heard from four other vendors. Nobody broke a
        rule. There wasn&rsquo;t one.
      </p>

      <p>
        I ran this handoff for three years at RSA Conference with Arxan, and
        again with channel partners across Latin America. The clock barely
        changed between the two. Who owned it changed every time, and the
        teams that never decided who owned it are the ones that ended up
        arguing about badge counts in January.
      </p>

      <h2>The SLA I&rsquo;d Sign, Tier by Tier</h2>

      <p>
        This is the version I&rsquo;d hand a VP of Sales before the show, with
        both of our names at the bottom.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Post-event follow-up SLA by lead tier: what the booth captured,
            the handoff clock, the first touch, who owns it, and what happens
            when the clock is missed
          </caption>
          <thead>
            <tr>
              <th scope="col">Tier</th>
              <th scope="col">What the booth captured</th>
              <th scope="col">Handoff to a rep</th>
              <th scope="col">First touch</th>
              <th scope="col">Owner</th>
              <th scope="col">If the clock is missed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Hot</th>
              <td>
                A real conversation, a one-sentence note and a timing signal,
                like a renewal in the spring or a project with budget
              </td>
              <td>Same day, while the show is still running</td>
              <td>
                Within one business day of handoff, from the rep&rsquo;s own
                inbox or phone, quoting the note
              </td>
              <td>The named account executive</td>
              <td>
                Goes to the sales manager on day two, and shows up in the
                weekly review with the rep&rsquo;s name next to it
              </td>
            </tr>
            <tr>
              <th scope="row">Warm</th>
              <td>A real conversation and a note, no timing yet</td>
              <td>Within 24 hours of the scan</td>
              <td>
                A personal email within two business days, then the 30-60-90
                day cadence
              </td>
              <td>SDR or account executive, decided before the show</td>
              <td>Back into the pool and reassigned</td>
            </tr>
            <tr>
              <th scope="row">Partner-sourced</th>
              <td>
                A buyer a channel partner brought to the booth or the
                roundtable
              </td>
              <td>
                Within 24 hours, to the partner and your channel manager
                together
              </td>
              <td>The partner&rsquo;s rep, inside the same 24 hours</td>
              <td>The partner, with your channel manager copied</td>
              <td>Your channel manager calls the partner, never the buyer</td>
            </tr>
            <tr>
              <th scope="row">Existing customer</th>
              <td>A customer who stopped by, with or without a note</td>
              <td>Within 24 hours, to whoever owns the account</td>
              <td>The account owner, within two business days</td>
              <td>Account executive or customer success manager</td>
              <td>Flagged to the account owner&rsquo;s manager</td>
            </tr>
            <tr>
              <th scope="row">Scan only</th>
              <td>No note, or tagged as a swag stop</td>
              <td>No rep</td>
              <td>Marketing nurture email within a week</td>
              <td>Marketing</td>
              <td>Nothing. That&rsquo;s the point of this tier.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The Clock Starts at the Badge</h2>

      <p>
        Most follow-up SLAs I&rsquo;ve read start the clock when a lead lands
        in the CRM. That one choice lets a scan sit in an app for six days
        without anybody missing a deadline, which is how the Friday CSV
        happens.
      </p>

      <p>
        Mine starts at the scan. At Arxan every lead went to a rep within 24
        hours of being scanned, and every scan was tagged in the CRM as
        RSA-sourced, and the only way that works on the Wednesday of a show
        week is if marketing ops uploads every night from the hotel instead of
        once from home. It also only works if the booth team types{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          one sentence into the notes field
        </Link>{" "}
        before the next visitor walks up, because the note is what decides the
        tier. A scan with no note is a name, and I won&rsquo;t send a rep a
        name.
      </p>

      <h2>Where Each Owner Fits (and Where It Doesn&rsquo;t)</h2>

      <p>
        <strong>Account executives should keep the hot tier.</strong> The SDR
        team will ask for everything, and they&rsquo;ll mean well. A buyer who
        told you about a spring renewal doesn&rsquo;t want a qualification
        call, though. They want the person who can price it. Where SDRs win:
        a show the size of RSA, where the warm tier alone can run to hundreds
        of names and the account executives are booked into{" "}
        <Link href="/blog/conference-customer-dinner">
          customer dinners
        </Link>{" "}
        every night of the week. Give SDRs the warm tier there and nobody
        waits.
      </p>

      <p>
        <strong>Nurture is a real answer.</strong> I&rsquo;d rather hand a rep
        sixty names with notes than four hundred they learn to ignore by
        Tuesday. The swag scans still count (marketing owns them, and some of
        them turn into something by spring), but they don&rsquo;t belong in a
        rep&rsquo;s queue, and putting them there is how a sales team decides
        event leads are junk. That opinion follows me into every{" "}
        <Link href="/blog/trade-show-giveaways">giveaway conversation</Link>,
        too.
      </p>

      <p>
        <strong>Partners get the lead, and your channel manager stays copied.</strong> At{" "}
        <Link href="/blog/illumio-latam-channel-partnership">
          Illumio&rsquo;s LATAM partner events
        </Link>{" "}
        the 24-hour rule belonged to the partner, because the buyer was the
        partner&rsquo;s relationship first. Where that breaks: a partner with
        no rep who speaks to that buyer&rsquo;s level. Then your channel
        manager makes the intro and stays on the thread.
      </p>

      <p>
        <strong>An executive dinner doesn&rsquo;t need this table at
        all.</strong> Twelve guests get a note from the executive who hosted
        them, and I&rsquo;ve written up{" "}
        <Link href="/blog/executive-vip-dinner-trade-show">
          how that note gets drafted
        </Link>
        . Putting a VP who ate your short rib on Tuesday into an SDR sequence
        on Wednesday is the fastest way I know to undo a good dinner.
      </p>

      <h2>Every Week, With Names on It</h2>

      <p>
        The 30-60-90 day cadence only works if somebody reads the list every
        week (day forty is where I&rsquo;ve watched the most leads go quiet,
        after the second email). Monthly is too slow to catch it.
      </p>

      <p>
        My weekly report has five columns: leads by tier, the share touched
        inside the clock, meetings booked, opportunities created and the
        rep&rsquo;s name. People flinch at the last column. I think it&rsquo;s
        the kindest one on the page, because a rep sitting on twenty untouched
        leads in week two would much rather hear it from me on a Monday than
        from their manager in March. The pipeline number gets read out loud at
        the end of Q2, which is{" "}
        <Link href="/blog/measure-trade-show-roi">
          how I measured RSA against our other lead sources
        </Link>
        .
      </p>

      <h2>The First Email</h2>

      <p>
        If it opens with &ldquo;Great meeting you at the show!&rdquo; and a
        calendar link, the buyer knows you weren&rsquo;t the one they met.
      </p>

      <h2>Sign It in the Budget Meeting</h2>

      <p>
        I get the SLA signed in the same meeting where the booth budget gets
        approved, while sales still wants the show to happen. Then it goes
        into the booth staff briefing on Sunday night and into the{" "}
        <Link href="/blog/event-post-mortem">post-mortem</Link> afterward,
        with the share of leads touched on time sitting right next to the cost
        per lead. Two weeks after the show is too late to negotiate who owns a
        lead. Everyone has already decided it was somebody else.
      </p>

      <p>
        If your team has a show coming up and a scanner app nobody has
        thought about since the last one,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! I&rsquo;m looking for
        an in-house events team, and I&rsquo;ll bring the SLA to the first
        meeting.
      </p>
    </>
  );
}
