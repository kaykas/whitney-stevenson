import Link from "next/link";

export function calculatingTradeShowRoiPost() {
  return (
    <>
      <p>Finance will ask for one number.</p>

      <p>
        I&rsquo;ve watched event marketers walk into that meeting with six of
        them, badge scans and booth traffic and social impressions and a
        cost per lead somebody calculated on the plane home, and watched a
        CFO pick the weakest one off the slide and spend twenty minutes on
        it. At Arxan, going into our second year at RSA Conference, the
        question from leadership was whether the booth produced revenue. I
        answered it with a comparison against our other lead sources, and I
        wrote up{" "}
        <Link href="/blog/measure-trade-show-roi">
          how I set up that tracking
        </Link>{" "}
        already. This Field Note is the arithmetic: which numbers I calculate,
        and which one I&rsquo;d put on the slide.
      </p>

      <h2>The Formula, With the Costs People Forget</h2>

      <p>
        Trade show ROI is revenue from the show, minus what the show cost,
        divided by what the show cost. Every guide prints that. The
        calculation goes wrong in the denominator, because the space rental
        is the only cost anybody remembers in March.
      </p>

      <p>
        My cost sheet has a line for the booth space, the build or the
        rental, shipping and drayage, the hall&rsquo;s AV and internet and
        electrical (which arrive as three separate invoices from three
        separate desks), lead scanner rental, giveaways, every flight and
        hotel night for the booth team, and any dinner or suite we hosted
        that week. Staff salaries stay off unless finance wants them on. If
        they do, put them on for every lead source you compare against, or
        the booth looks expensive next to a webinar that also cost four
        people a week.
      </p>

      <h2>A Worked Example</h2>

      <p>
        These numbers are invented. Arxan&rsquo;s figures belong to Arxan, so
        I built a mid-size show from scratch to make the math visible: a
        10x20 booth at an industry conference, eight people from the company
        working it, all costs in.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Worked example (invented figures): the cost basis for one
            mid-size B2B trade show
          </caption>
          <thead>
            <tr>
              <th scope="col">Cost line</th>
              <th scope="col">Amount</th>
              <th scope="col">What people forget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Booth space</th>
              <td>$45,000</td>
              <td>Nothing. Everyone remembers this one.</td>
            </tr>
            <tr>
              <th scope="row">Booth build or rental</th>
              <td>$35,000</td>
              <td>Storage between shows, and repairs after load-out</td>
            </tr>
            <tr>
              <th scope="row">Drayage, AV, internet, electrical</th>
              <td>$12,000</td>
              <td>
                Billed separately by the venue and its contractors, weeks
                after the show
              </td>
            </tr>
            <tr>
              <th scope="row">Travel and hotels for 8 people</th>
              <td>$22,000</td>
              <td>The extra night when load-out runs late</td>
            </tr>
            <tr>
              <th scope="row">Scanners and giveaways</th>
              <td>$6,000</td>
              <td>Scanner rental is per device, per day</td>
            </tr>
            <tr>
              <th scope="row">Total investment</th>
              <td>$120,000</td>
              <td>The denominator for every row in the next table</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Now the outcomes. Say the booth scanned 600 badges, 210 of them with a
        real note from a real conversation. By the end of Q2, 18 of those
        turned into opportunities worth $1.44 million in pipeline. By month
        nine, four of them closed for $320,000.
      </p>

      <p>
        Closed-won ROI is ($320,000 minus $120,000) divided by $120,000, which
        comes to 167%. Pipeline-to-cost is $1.44 million over $120,000, or 12
        to 1. Each badge cost $200 to scan. Each opportunity cost about
        $6,667. If finance wants ROI on gross margin instead of revenue, and
        a good finance team will, multiply that $320,000 by your margin before
        you subtract anything. At 70% margin the ROI drops to about 87%,
        which is still a fine number and a much more honest one.
      </p>

      <h2>Every Number I&rsquo;d Calculate, and When It&rsquo;s Ready</h2>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Trade show ROI and effectiveness metrics: formula, when you can
            read it, the worked-example result, and where each one misleads
          </caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Formula</th>
              <th scope="col">Ready when</th>
              <th scope="col">Worked example</th>
              <th scope="col">Where it misleads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cost per badge scan</th>
              <td>Total cost ÷ scans</td>
              <td>The last day of the show</td>
              <td>$200</td>
              <td>
                Rewards the booth with the best giveaway. Swag stops count the
                same as buyers.
              </td>
            </tr>
            <tr>
              <th scope="row">Note rate</th>
              <td>Scans with a written note ÷ all scans</td>
              <td>The last day of the show</td>
              <td>35% (210 of 600)</td>
              <td>
                Measures the booth team, and says nothing yet about whether
                the buyers were real
              </td>
            </tr>
            <tr>
              <th scope="row">Cost per noted conversation</th>
              <td>Total cost ÷ scans with a note</td>
              <td>The last day of the show</td>
              <td>About $571</td>
              <td>
                Easy to inflate if nobody checks what &ldquo;a note&rdquo;
                means. &ldquo;Wants pricing&rdquo; is a note in name only.
              </td>
            </tr>
            <tr>
              <th scope="row">Cost per opportunity</th>
              <td>Total cost ÷ opportunities created</td>
              <td>60 to 90 days out</td>
              <td>About $6,667</td>
              <td>
                Counts a tiny opportunity the same as a seven-figure one
              </td>
            </tr>
            <tr>
              <th scope="row">Pipeline-to-cost ratio</th>
              <td>Show-sourced pipeline ÷ total cost</td>
              <td>End of Q2, for a spring show</td>
              <td>12 to 1</td>
              <td>
                Pipeline is a forecast. Sales teams inflate it in April and
                quietly shrink it by October.
              </td>
            </tr>
            <tr>
              <th scope="row">Closed-won ROI</th>
              <td>(Closed revenue − cost) ÷ cost</td>
              <td>6 to 12 months out</td>
              <td>167% on revenue, about 87% on 70% margin</td>
              <td>
                Arrives after next year&rsquo;s booth deposit is due, so it
                can&rsquo;t decide whether you go back
              </td>
            </tr>
            <tr>
              <th scope="row">Comparison to other sources</th>
              <td>
                Any row above, set next to the same row for webinars,
                outbound and paid
              </td>
              <td>Whenever the row it compares is ready</td>
              <td>Depends on your other channels</td>
              <td>
                Only works if every source was tagged the same way from the
                start
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Where Each Number Fits (and Where It Doesn&rsquo;t)</h2>

      <p>
        <strong>Pipeline-to-cost goes on the slide.</strong> It&rsquo;s the
        earliest number that has anything to do with revenue, and it lands
        before anyone signs next year&rsquo;s contract. I read RSA&rsquo;s at
        the end of Q2 for exactly that reason. Its weakness is that pipeline
        is a guess with a dollar sign on it, so I show it next to the same
        ratio for our other lead sources, which turns a soft number into a
        fair fight.
      </p>

      <p>
        <strong>Closed-won ROI is the true number, and it shows up
        late.</strong> Report it in the{" "}
        <Link href="/blog/event-post-mortem">post-mortem</Link> you hold at
        the end of the year, and use it to check whether last spring&rsquo;s
        pipeline was honest. Where it wins outright: a show that already
        has a few years of history, where you can line up three closed-won
        figures and see the trend.
      </p>

      <p>
        <strong>Cost per scan should never leave the building.</strong> I
        mean that. It&rsquo;s the number most likely to end up on a slide and
        the one that tells you the least, because the cheapest scan on any
        show floor belongs to whoever is handing out the best socks (I have
        opinions about{" "}
        <Link href="/blog/trade-show-giveaways">giveaways</Link>, too).
      </p>

      <p>
        <strong>Note rate is for you.</strong> Nobody in finance will ever ask
        for it. It&rsquo;s the only number on the list you can read on the
        show floor and still fix on the show floor.
      </p>

      <h2>Booth Staff Training Moves the Math More Than the Booth Does</h2>

      <p>
        At RSA our booth sat between Palo Alto Networks and CrowdStrike, on a
        floor of forty thousand people, and both of our neighbors outspent us
        every year. We couldn&rsquo;t win on square footage. What we could
        control was what the people in our booth did in the twenty seconds
        after a scan, which is the subject of{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          the briefing I give the booth team the night before
        </Link>
        : one sentence in the notes field after every real conversation,
        before the next visitor walks up.
      </p>

      <p>
        Run the worked example again with a lazier booth. Same $120,000, same
        600 scans, but only 90 of them carry a note instead of 210. The
        reps now have 120 fewer conversations they can actually follow up on
        with something specific, and every one of those lost conversations
        is pipeline that never gets created, which shows up months later as
        a worse ratio on the slide that decides whether you go back. Nothing
        about the booth changed except the briefing.
      </p>

      <p>
        So I measure trade show effectiveness on the floor by checking the
        note rate at the end of each day, booth person by booth person, and
        I say something at breakfast if anyone&rsquo;s is low. It feels
        fussy. It&rsquo;s the cheapest fix in the whole budget.
      </p>

      <h2>The Three-Year Asterisk</h2>

      <p>
        Every figure above measures one show, once, and I think a big annual
        show deserves{" "}
        <Link href="/blog/anchoring-arxan-three-years-rsa">
          three years before anyone calls it
        </Link>
        . At RSA, Arxan&rsquo;s pipeline contribution grew every year and
        Year Three was the highest of the three. A Year One pipeline-to-cost
        ratio that looks thin might just be a company the buyers haven&rsquo;t
        seen twice yet.
      </p>

      <h2>What I&rsquo;d Bring to the Budget Meeting</h2>

      <p>
        One slide. Total cost with the forgotten lines included, and
        pipeline-to-cost next to the same ratio for our other lead sources.
        If we have last year&rsquo;s closed-won ROI, it goes underneath. Note rate and
        cost per scan stay in my own spreadsheet, along with the{" "}
        <Link href="/blog/post-event-follow-up-sla">
          follow-up SLA numbers
        </Link>{" "}
        that explain why the pipeline looks the way it does.
      </p>

      <p>
        If your team has a show on the calendar and a CFO who already asked
        for the number,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! I&rsquo;m looking for
        an in-house events team, and I&rsquo;ll build the cost sheet before
        anyone orders carpet.
      </p>
    </>
  );
}
