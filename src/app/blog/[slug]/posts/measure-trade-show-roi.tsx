import Link from "next/link";

export function measureTradeShowRoiPost() {
  return (
    <>
      <p>
        The show closed on Thursday. By Monday someone in finance has the
        drayage invoice and the booth internet bill, and they want to know
        what all of it brought back. You have a badge-scanner export, a
        team that swears the booth was packed, and a budget meeting on the
        calendar. That&rsquo;s the moment trade show ROI stops being a
        formula and turns into a question about bookkeeping you either did
        before the show or didn&rsquo;t.
      </p>

      <p>Somebody always asks for the number.</p>

      <p>
        For me it was Arxan&rsquo;s leadership, going into our second year
        at RSA Conference, and the ask was blunt: could I prove the booth
        produced revenue? We had spent Year One wedged between Palo Alto
        Networks and CrowdStrike on a floor of forty thousand people, and I
        knew the booth had worked, because I&rsquo;d watched people stop.
        Watching people stop is not a line item. If I couldn&rsquo;t answer
        with a spreadsheet, the budget was in danger, and so was Year Two.
      </p>

      <p>
        The guides that rank for measuring trade show ROI will walk you
        through the same ground, and I agree with nearly all of it. Set
        goals before the show. Use the formula, revenue minus investment
        divided by investment. Count every cost, including the drayage and
        the booth internet nobody remembers budgeting for. Tag leads in
        your CRM, follow up fast, and be patient, because B2B deals take
        months to close. All correct! The trouble is the unit. Every one of
        those guides measures a single show, as if the question were
        whether this one booth paid for itself by June, and in my
        experience that is the question that gets good trade show programs
        cancelled.
      </p>

      <h2>Why the single-show ROI formula breaks</h2>

      <p>
        What most teams try first is the formula on its own: add up the
        show&rsquo;s costs, find the deals that came from it, and report a
        percentage. It breaks in three places I&rsquo;ve watched up close.
        The deals aren&rsquo;t findable months later unless every scan was
        tagged on the floor. A percentage with nothing next to it invites
        the CFO to ask what the same money would have done elsewhere. And a
        B2B buyer who first met you at the booth may not show up in the
        pipeline until the next year&rsquo;s show.
      </p>

      <p>
        What worked at Arxan was a sequence, and I run it in this order. A
        source tag on every badge scan, applied on the floor in real
        time. A rep on every lead within 24 hours. A 30-60-90 day
        follow-up cadence checked every week. One look at the numbers at the
        end of Q2, side by side with our other lead sources. And a
        three-year arc, agreed with leadership before the first deposit.
      </p>

      <table className="post-table">
        <caption>
          Ways to measure trade show ROI compared: what each one counts,
          when you can report it, where it breaks, and what I used for
          Arxan at RSA Conference
        </caption>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">What it counts</th>
            <th scope="col">Ready to report</th>
            <th scope="col">Where it breaks</th>
            <th scope="col">Arxan at RSA (3 years)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Badge count</th>
            <td>Scans collected at the booth</td>
            <td>The night the show closes</td>
            <td>
              Measures traffic, not revenue. Reporting it in a budget
              meeting means reporting badge counts with a straight face
            </td>
            <td>Every scan tagged in the CRM with RSA as the source</td>
          </tr>
          <tr>
            <th scope="row">Single-show ROI formula</th>
            <td>(Revenue &minus; investment) &divide; investment for one show</td>
            <td>Once the deals close, often months later</td>
            <td>
              No comparison, and it judges the show before the buyers who
              met you there have moved
            </td>
            <td>One line of the spreadsheet; the comparison did the persuading</td>
          </tr>
          <tr>
            <th scope="row">Source comparison</th>
            <td>
              Opportunities, dollar value and conversion rate from show
              leads next to other lead sources
            </td>
            <td>End of Q2, after the 90-day cadence</td>
            <td>
              Only works if every scan was tagged with the show as its
              source in the CRM
            </td>
            <td>The number I built for leadership, ready by the end of Q2</td>
          </tr>
          <tr>
            <th scope="row">Three-year arc</th>
            <td>Pipeline contribution across three consecutive shows</td>
            <td>After Year Three</td>
            <td>
              Needs leadership to agree before the first deposit, and the
              same show three years running
            </td>
            <td>
              Pipeline grew every year. Year Three was the highest of the
              three
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Pick Your Comparison Before You Pick Your Booth</h2>

      <p>
        An ROI percentage on its own persuades almost nobody in a budget
        meeting. Your CFO hears &ldquo;the booth returned X&rdquo; and
        immediately wonders what the same money would have done somewhere
        else, and they&rsquo;re right to wonder.
      </p>

      <p>
        So the number I built at Arxan was a comparison. By the end of Q2 we
        could point to specific RSA-sourced opportunities, their dollar
        value, and their conversion rates next to our other lead sources.
        That last part did the persuading. I won&rsquo;t print the figures
        here, because they belong to Arxan, but I can tell you the shape of
        the argument: here is what a lead from the booth turned into, here is
        what a lead from everywhere else turned into, and here is the
        difference. Decide which sources you&rsquo;ll compare against before
        the show, while marketing ops still has time to make sure every
        source is tagged the same way.
      </p>

      <h2>Tag It on the Floor</h2>

      <p>
        Every badge we scanned at the booth got tagged in the CRM with
        RSA-source attribution. Every one. You can rebuild a cost sheet in
        March from invoices and expense reports, but you cannot go back and
        work out which of that month&rsquo;s new contacts came from the booth
        and which came from a webinar. The tag is the one piece
        of the whole measurement exercise that has to happen in real time.
      </p>

      <p>
        The tag tells you where a lead came from. It tells you nothing about
        what the person said, and that&rsquo;s why I make{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          the booth team
        </Link>{" "}
        type one sentence into the notes field after every real
        conversation. A pipeline report full of RSA-tagged leads with empty
        notes is a list of names. It will not survive a skeptical VP of
        Sales asking which of them were real.
      </p>

      <h2>Twenty-Four Hours, Then Every Single Week</h2>

      <p>
        Every lead went to a rep within 24 hours of the scan. That part
        shows up in every guide, and it&rsquo;s easy to agree with in a
        planning meeting and surprisingly hard to pull off on the Thursday
        of a show week, when the reps are still on the floor and their
        inboxes are on fire.
      </p>

      <p>
        The part I&rsquo;d underline twice is what came after. Every rep had
        a 30-60-90 day follow-up cadence, and we tracked it every week (I
        wrote the whole thing up as{" "}
        <Link href="/blog/post-event-follow-up-sla">
          the follow-up SLA I&rsquo;d sign with sales
        </Link>
        ). Weekly matters because leads
        rarely die loudly. They go quiet around day forty, after a second
        email nobody answered, and unless someone is looking at the list
        every week, a quiet lead looks exactly like a slow one until the
        quarter is over and it is simply gone.
      </p>

      <h2>Year One Is the Wrong Unit</h2>

      <p>
        This is the opinion I&rsquo;ll defend in any budget meeting, and
        it&rsquo;s the one missing from every ROI guide I&rsquo;ve read.
      </p>

      <p>
        I ran Arxan&rsquo;s presence at{" "}
        <Link href="/blog/anchoring-arxan-three-years-rsa">
          RSA for three consecutive years
        </Link>
        . Pipeline contribution grew every year, and Year Three was the
        highest of the three, with a booth we had barely changed. The buyers
        walking that floor were mostly the same CISOs and security
        architects every year. By the third year they had seen us in the
        same neighborhood, with roughly the same message, twice already,
        and we had started to register as a fixture: a company that was
        clearly going to be there and clearly investing in the
        relationship. Some of the deals that showed up in Year Three almost
        certainly started with a conversation in Year One that went nowhere
        at the time.
      </p>

      <p>
        Measure a single show and you will be tempted to cut it at exactly
        the moment it starts compounding (I wrote about{" "}
        <Link href="/blog/b2b-event-calendar">
          what I&rsquo;d cut from an event calendar instead
        </Link>
        ). I&rsquo;d judge a big annual
        trade show on a three-year arc, and I&rsquo;d tell leadership that
        up front, before the first deposit. Year One you arrive. Year Two
        you prove the math, which is the job of the spreadsheet. Year Three
        you get to be the company people expect to see, which is worth more
        than any new activation, and which no single-year ROI formula will
        ever give you credit for.
      </p>

      <p>
        The January conversation gets shorter, too. You report on where
        you are in a plan everyone already signed, and nobody reopens
        whether to go back at all.
      </p>

      <h2>When to Look</h2>

      <p>
        I&rsquo;ve said in another Field Note that the best{" "}
        <Link href="/blog/event-marketing-interview-questions">
          interview question for an event marketer
        </Link>{" "}
        is when they last looked at the pipeline number, and who handed it
        to them. For RSA, my answer was the end of Q2. That was
        long enough for the 90-day cadence to run its course and early
        enough to have real numbers on the table before anybody started
        arguing about next year. Look too early and you are reporting badge
        counts with a straight face. Look too late and somebody has already
        decided for you.
      </p>

      <h2>The Dinner Problem</h2>

      <p>
        Somewhere in every CRM there is a deal tagged as an outbound win
        that really jumped a stage at a{" "}
        <Link href="/blog/conference-customer-dinner">
          customer dinner during conference week
        </Link>
        , over the bread, and no attribution model on earth will hand the
        booth credit for it.
      </p>

      <h2>Where each method fits, and who should skip the three-year view</h2>

      <p>
        Badge counts are fine for a staffing post-mortem and useless in a
        budget meeting. The single-show formula fits a one-time event or a
        regional show you&rsquo;re trying out once. Source comparison fits
        almost everyone, as long as marketing ops can tag every source the
        same way. The three-year arc fits a big annual show where the same
        buyers walk the floor every year, the way the CISOs did at RSA.
      </p>

      <p>
        Skip the three-year view if you can&rsquo;t promise leadership the
        same show for three years, or if the event is a launch whose message
        will be wrong by next spring. Measure that show on its own and
        compare it to your other sources. And if your sales team won&rsquo;t
        pick up leads within 24 hours or log a note on each one, fix the
        handoff before you pick any ROI method, because none of them survive
        an empty CRM record.
      </p>

      <h2>The formula is the easy part</h2>

      <p>
        I worked the formula through with real-looking numbers in{" "}
        <Link href="/blog/calculating-trade-show-roi">
          calculating trade show ROI
        </Link>
        . At Arxan, the spreadsheet from Year Two is how we bought Year
        Three.
      </p>

      <p>
        If you run events for a B2B company with a big annual show on the
        calendar and a budget meeting you&rsquo;re already dreading,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! Every badge scanned
        without a source tag is a lead nobody can credit to the booth in
        Q2. I&rsquo;ll bring the tagging plan, and I&rsquo;ll want to know
        which lead sources we&rsquo;re comparing against before anyone
        orders carpet.
      </p>
    </>
  );
}
